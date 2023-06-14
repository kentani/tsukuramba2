import { getFirestore, collection, query, where, getDocs, orderBy, limit, doc, setDoc, serverTimestamp } from "firebase/firestore"
import moment from 'moment'
// import 'moment/dist/locale/ja'

export default function MenuTableListStore(ctx: any) {
  // 状態
  const state = reactive<{
    allTags: Array<any>,
    allMenus: Array<any>,
    menuTables: Array<any>,
    currentDate: any,
    currentMonth: any,
    currentWeek: any,
    currentMenuTables: any,
  }>({
    allTags: [],
    allMenus: [],
    menuTables: [],
    currentDate: moment(),
    currentMonth: null,
    currentWeek: [],
    currentMenuTables: [],
  })

  // computed
  const allTags = computed(() => {
    return state.allTags
  })

  const allMenus = computed(() => {
    return state.allMenus
  })

  const menuTables = computed(() => {
    return state.menuTables
  })

  const tagsHash = computed(() => {
    let hash: any = {}
    state.allTags.forEach((item) => {
      hash[item.id] = item
    })
    return hash
  })

  const menusHash = computed(() => {
    let hash: any = {}
    state.allMenus.forEach((item) => {
      hash[item.id] = item
    })
    return hash
  })

  const menuTablesHash = computed(() => {
    let hash: any = {}
    state.menuTables.forEach((item) => {
      hash[item.yyyymmdd] = item
    })
    return hash
  })

  const currentDate = computed(() => {
    return state.currentDate
  })

  const currentMonth = computed(() => {
    return state.currentMonth
  })

  const currentWeek = computed(() => {
    return state.currentWeek
  })

  const currentMenuTables = computed(() => {
    return state.currentMenuTables
  })

  //////////////////////////
  // ロジック
  //////////////////////////
  // DB系
  //////////////////////////
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
      const start = moment(params.startDate).format('YYYY-MM-DD')
      const end = moment(params.startDate).add(6, 'days').format('YYYY-MM-DD')

      const querySnapshot = await getDocs(query(
        collection(db, 'menu-tables'),
        where("yyyymmdd", ">=", start),
        where("yyyymmdd", "<=", end),
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

  //////////////////////////
  // DB以外
  //////////////////////////
  const changeWeek = async (params: { type: String }) => {
    setCurrentDate({ type: params.type })
    setCurrentMonth();
    setCurrentWeek();
    state.menuTables = []
    await fetchMenuTables({ startDate: currentDate.value })
    setCurrentMenuTables()
  }

  const setCurrentDate = (params: { type: String }) => {
    if (params.type === 'prev') {
      state.currentDate = currentDate.value.subtract(7, "days");
    } else if (params.type === 'next') {
      state.currentDate = currentDate.value.add(7, "days");
    } else if (params.type === 'now') {
      state.currentDate = moment()
    }
  }

  const setCurrentMonth = () => {
    state.currentMonth = currentDate.value.format('M');
  }

  const setCurrentWeek = () => {
    let week: Array<Object> = [];

    [0, 1, 2, 3, 4, 5, 6].forEach(i => {
      const current = moment(currentDate.value);
      let date = current.add(i, "days");

      week.push({
        month: date.format('MM'),
        day: date.format('ddd'),
        date: date.format('DD'),
        yyyymmdd: date.format('YYYY-MM-DD'),
      });
    });

    state.currentWeek = week;
  }

  const setCurrentMenuTables = () => {
    let currentMenuTables: Array<Object> = []

    currentWeek.value.forEach((week: any) => {
      const menuTable = menuTablesHash.value[week.yyyymmdd] || {};

      currentMenuTables.push({
        ...week,
        ...menuTable,
      })
    })

    state.currentMenuTables = currentMenuTables
  }

  return {
    allTags,
    allMenus,
    menuTables,
    tagsHash,
    menusHash,
    currentDate,
    currentMonth,
    currentWeek,
    currentMenuTables,
    fetchAllTags,
    fetchAllMenus,
    fetchMenuTables,
    changeWeek,
    setCurrentDate,
    setCurrentMonth,
    setCurrentWeek,
    setCurrentMenuTables,
  }
}

export type MenuTableListStoreType = ReturnType<typeof MenuTableListStore>
