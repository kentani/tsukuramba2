import { getFirestore, collection, query, where, getDocs, orderBy, limit, doc, setDoc, serverTimestamp } from "firebase/firestore"
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
  const fetchMenuTable = async (params: { menuTableID: any }) => {
    if (ctx && !currentMenuTable.value.id) {
      const db = getFirestore(ctx.$firebase)

      const querySnapshot = await getDocs(query(
        collection(db, 'menu-tables'),
        where('id', '==', params.menuTableID),
        limit(1)
      ))

      querySnapshot.forEach((doc) => {
        setCurrentMenuTable({ menuTable: doc.data() })
      })
    }

    return currentMenuTable.value
  }

  const createMenuTable = async (params: { yyyymmdd: any }) => {
    if (ctx) {
      const db = getFirestore(ctx.$firebase)
      const docRef = doc(collection(db, "menu-tables"))
      const menuTable = {
        id: docRef.id,
        yyyymmdd: params.yyyymmdd,
        menus: [],
      }

      await setDoc(docRef, menuTable)
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
    buildMenus,
  }
}

export type MenuTableStoreType = ReturnType<typeof MenuTableStore>
