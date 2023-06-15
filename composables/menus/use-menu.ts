import { getFirestore, collection, query, where, getDocs, orderBy, limit, doc, setDoc, serverTimestamp } from "firebase/firestore"

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

  const setCurrentMenu = (params: { menu: any }) => {
    state.currentMenu = params.menu
  }

  return {
    currentMenu,
    fetchMenu,
    setCurrentMenu,
  }

  //////////////////////////
  // DB以外
  //////////////////////////
}

export type MenuStoreType = ReturnType<typeof MenuStore>
