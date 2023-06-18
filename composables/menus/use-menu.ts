import { getFirestore, collection, query, where, getDocs, orderBy, limit, doc, setDoc, serverTimestamp, updateDoc } from "firebase/firestore"

export default function MenuStore(ctx: any) {
  // 状態
  const state = reactive<{
    currentMenu: any,
  }>({
    currentMenu: {},
  })

  // computed
  const currentMenu = computed(() => {
    return state.currentMenu
  })

  //////////////////////////
  // ロジック
  //////////////////////////
  // DB系
  //////////////////////////
  const fetchMenu = async (params: { menuID: any }) => {
    if (ctx && !currentMenu.value.id) {
      const db = getFirestore(ctx.$firebase)

      const querySnapshot = await getDocs(query(
        collection(db, 'menus'),
        where('id', '==', params.menuID),
        limit(1)
      ))

      querySnapshot.forEach((doc) => {
        setCurrentMenu({ menu: doc.data() })
      })
    }

    return currentMenu.value
  }

  const createMenu = async (params: { menu: any }) => {
    if (ctx) {
      const db = getFirestore(ctx.$firebase)
      const docRef = doc(collection(db, "menus"))
      const menu = {
        ...params.menu,
        id: docRef.id,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }

      await setDoc(docRef, menu)
      setCurrentMenu({ menu: menu })
    }

    return currentMenu.value
  }

  const updateMenu = async (params: { menu: any }) => {
    if (ctx) {
      const db = getFirestore(ctx.$firebase)
      const docRef = doc(db, "menus", params.menu.id)
      const menu = {
        ...params.menu,
        updatedAt: serverTimestamp(),
      }

      await updateDoc(docRef, menu)
      setCurrentMenu({ menu: menu })
    }

    return currentMenu.value
  }

  //////////////////////////
  // DB以外
  //////////////////////////

  const setCurrentMenu = (params: { menu: any }) => {
    state.currentMenu = Object.assign({}, state.currentMenu, params.menu)
  }

  const resetCurrentMenu = () => {
    state.currentMenu = {}
  }

  return {
    currentMenu,
    fetchMenu,
    createMenu,
    updateMenu,
    setCurrentMenu,
    resetCurrentMenu,
  }

  //////////////////////////
  // DB以外
  //////////////////////////
}

export type MenuStoreType = ReturnType<typeof MenuStore>
