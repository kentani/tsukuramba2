import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth"
import { getFirestore, collection, query, where, getDocs, orderBy, limit, doc, setDoc, serverTimestamp } from "firebase/firestore"
import moment from 'moment'
// import 'moment/dist/locale/ja'

export default function AuthStore(ctx: any) {
  // 状態
  const state = reactive<{
    currentUser: any,
    user: any,
    allTags: Array<Object>,
    tag: any,
    allMenus: Array<Object>,
    menu: any,
    menuTables: Array<Object>,
    menuTable: any,
  }>({
    currentUser: null,
    user: null,
    allTags: [],
    tag: null,
    allMenus: [],
    menu: null,
    menuTables: [],
    menuTable: null,
  })

  // computed
  const isLogined = computed(() => {
    return !!state.currentUser
  })

  const currentUser = computed(() => {
    return state.currentUser
  })

  const user = computed(() => {
    return state.user
  })

  const allTags = computed(() => {
    return state.allTags
  })

  const tag = computed(() => {
    return state.tag
  })

  const allMenus = computed(() => {
    return state.allMenus
  })

  const menu = computed(() => {
    return state.menu
  })

  const menuTables = computed(() => {
    return state.menuTables
  })

  const menuTable = computed(() => {
    return state.menuTable
  })

  // ロジック
  const login = async () => {
    await new Promise<void>(async (resolve) => {
      const auth = getAuth()

      await signInWithPopup(auth, new GoogleAuthProvider)
        .then(async (result) => {
          state.currentUser = result.user
          fetchUser({ uid: result.user.uid })
          if(!user.value) {
            await createUser({
              uid: result.user.uid,
              name: result.user.displayName,
            })

            fetchUser({ uid: result.user.uid })
          }
        }).catch((error) => {
          console.log(error)
        })

      resolve()
    })
  }

  const logout = () => {
    const auth = getAuth()
    let val = false

    signOut(auth).then(() => {
      state.currentUser = null
      state.user = null
      val = true
    }).catch((error) => {
      console.log(error)
    })

    return val
  }

  const confirmAuth = async () => {
    await new Promise<void>((resolve) => {
      const auth = getAuth()

      onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          state.currentUser = auth.currentUser
          await fetchUser({ uid: currentUser?.uid })
        } else {
          state.currentUser = null
          state.user = null
        }

        resolve()
      })
    })
  }

  const createUser = async (params: { uid: String, name: String|null }) => {
    if (ctx) {
      const db = getFirestore(ctx.$firebase)
      const docRef = doc(collection(db, "users"))

      await setDoc(docRef, {
        id: docRef.id,
        uid: params.uid,
        name: params.name || '',
        admin: false,
        approved: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
    }
  }

  const fetchUser = async (params: { uid: String }) => {
    if (ctx && !user.value) {
      const db = getFirestore(ctx.$firebase)

      const querySnapshot = await getDocs(query(
        collection(db, 'users'),
        where("uid", "==", params.uid),
        limit(1)
      ))

      querySnapshot.forEach((doc) => {
        state.user = doc.data()
      })
    }

    return user.value
  }

  const fetchAllTags = async () => {
    if (ctx && !allTags.value?.length) {
      const db = getFirestore(ctx.$firebase)

      const querySnapshot = await getDocs(query(
        collection(db, 'tags'),
        orderBy('sort', 'asc'),
      ))

      let tmpTags: Object[] = []

      querySnapshot.forEach((doc) => {
        tmpTags.push(doc.data())
      })

      state.allTags = tmpTags
    }

    return allTags.value
  }

  const fetchAllMenus = async () => {
    if (ctx && !allMenus.value?.length) {
      const db = getFirestore(ctx.$firebase)

      const querySnapshot = await getDocs(query(
        collection(db, 'menus'),
        orderBy('updatedAt', 'desc'),
      ))

      let tmpMenus: Object[] = []

      querySnapshot.forEach((doc) => {
        tmpMenus.push(doc.data())
      })

      state.allMenus = tmpMenus
    }

    return allTags.value
  }

  const fetchMenuTables = async (params: { startDate: any }) => {
    if (ctx && !menuTables.value?.length) {
      const db = getFirestore(ctx.$firebase)
      const now = moment(params.startDate)

      const querySnapshot = await getDocs(query(
        collection(db, 'menu-tables'),
        where("yyyymmdd", ">=", now.format('YYYY-MM-DD')),
        where("yyyymmdd", "<=", now.add(6, 'days').format('YYYY-MM-DD')),
        orderBy('yyyymmdd', 'asc')
      ))

      let tmpMenuTables: Object[] = []

      querySnapshot.forEach((doc) => {
        tmpMenuTables.push(doc.data())
      })

      state.menuTables = tmpMenuTables
    }

    return menuTables.value
  }

  return {
    isLogined,
    currentUser,
    user,
    allTags,
    allMenus,
    menuTables,
    login,
    logout,
    confirmAuth,
    fetchUser,
    fetchAllTags,
    fetchAllMenus,
    fetchMenuTables,
  }
}

export type AuthStoreType = ReturnType<typeof AuthStore>
