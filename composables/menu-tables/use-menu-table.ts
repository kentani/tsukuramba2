import { getFirestore, collection, query, where, getDocs, orderBy, limit, doc, setDoc, serverTimestamp, DocumentData, updateDoc } from "firebase/firestore"
import moment from 'moment'
// import 'moment/dist/locale/ja'

export default function MenuTableStore(ctx: any) {
  // 状態
  const state = reactive<{
    currentMenuTable: any,
  }>({
    currentMenuTable: {},
  })

  // computed
  const currentMenuTable = computed(() => {
    return state.currentMenuTable
  })

  //////////////////////////
  // ロジック
  //////////////////////////
  // DB系
  //////////////////////////
  const fetchMenuTable = async (params: { menuTableID?: any, yyyymmdd?: any, force?: boolean }) => {
    const { menuTableID, yyyymmdd, force } = params

    if(force) {
      resetCurrentMenuTable()
    }

    if (ctx && !currentMenuTable.value?.id) {
      const db = getFirestore(ctx.$firebase)
      let querySnapshot = <DocumentData>[]

      if(menuTableID) {
        querySnapshot = await getDocs(query(
          collection(db, 'menu-tables'),
          where('id', '==', menuTableID),
          limit(1)
        ))
      } else if(yyyymmdd) {
        querySnapshot = await getDocs(query(
          collection(db, 'menu-tables'),
          where('yyyymmdd', '==', yyyymmdd),
          limit(1)
        ))
      }

      await querySnapshot.forEach((doc: any) => {
        setCurrentMenuTable({ menuTable: doc.data() })
      })
    }

    return currentMenuTable.value
  }

  const createMenuTable = async (params: { yyyymmdd: any, menus?: any }) => {
    const { yyyymmdd, menus } = params

    if (ctx) {
      const db = getFirestore(ctx.$firebase)
      const docRef = doc(collection(db, "menu-tables"))
      const menuTable = {
        id: docRef.id,
        yyyymmdd: yyyymmdd,
        menus: menus || [],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }

      await setDoc(docRef, menuTable)
      setCurrentMenuTable({ menuTable: menuTable })
    }

    return currentMenuTable.value
  }

  const updateMenuTable = async (params: { id: any, menus?: any }) => {
    const { id, menus } = params

    if (ctx) {
      const db = getFirestore(ctx.$firebase)
      const docRef = doc(db, "menu-tables", id)
      const menuTable = {
        menus: menus || [],
        updatedAt: serverTimestamp(),
      }

      await updateDoc(docRef, menuTable)
      setCurrentMenuTable({ menuTable: menuTable })
    }

    return currentMenuTable.value
  }

  //////////////////////////
  // DB以外
  //////////////////////////
  const setCurrentMenuTable = (params: { menuTable: any }) => {
    const yyyymmdd = params.menuTable.yyyymmdd
    state.currentMenuTable = {
      ...params.menuTable,
      month: moment(yyyymmdd).format('MM'),
      day: moment(yyyymmdd).format('ddd'),
      date: moment(yyyymmdd).format('DD'),
    }
  }

  const resetCurrentMenuTable = () => {
    state.currentMenuTable = null
  }

  const buildMenus = (params: { menus: any, tagsHash: any, menusHash: any }) => {
    return params.menus.map((menuID: any) => {
      const menu = params.menusHash[menuID]

      return {
        ...menu,
        tags: menu.tags.map((tagID: any) => params.tagsHash[tagID]).sort((a: any, b: any) => {
          if (a.sort < b.sort) {
            return -1
          }
        })
      };
    })
  }

  return {
    currentMenuTable,
    fetchMenuTable,
    setCurrentMenuTable,
    resetCurrentMenuTable,
    createMenuTable,
    updateMenuTable,
    buildMenus,
  }
}

export type MenuTableStoreType = ReturnType<typeof MenuTableStore>
