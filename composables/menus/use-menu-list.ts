export default function MenuListStore(ctx: any) {
  // 状態
  const state = reactive<{
    filteredMenus: any,
  }>({
    filteredMenus: [],
  })

  // computed
  const filteredMenus = computed(() => {
    return state.filteredMenus
  })

  //////////////////////////
  // ロジック
  //////////////////////////
  // DB以外
  //////////////////////////
  const filterMenus = (params: { menus: any, name: any, tags: any }) => {
    let { menus, name, tags } = params
    let items = menus.map((menu: any) => ({...menu}))

    if(!name.length && !tags.length) {
      state.filteredMenus = items
      return filteredMenus.value
    }

    if(name.length) {
      items = items.filter((item: any) => item.name.includes(name))
    }

    if(tags.length) {
      items = items.filter((item: any) => {
        return tags.every((tagID: any) => item.tags.includes(tagID))
      })
    }

    state.filteredMenus = items

    return filteredMenus.value
  }

  const setFilteredMenus = (params: { menus: any }) => {
    state.filteredMenus = params.menus
  }

  const addMenu = (params: { menu: any }) => {
    state.filteredMenus.unshift(params.menu)
  }

  const updateFilteredMenus = (params: { menu: any }) => {
    const { menu } = params
    const index = state.filteredMenus.findIndex((m: any) => m.id === menu.id)
    state.filteredMenus.splice(index, 1)
    state.filteredMenus.unshift(menu)
  }

  return {
    filteredMenus,
    filterMenus,
    setFilteredMenus,
    addMenu,
    updateFilteredMenus,
  }
}

export type MenuListStoreType = ReturnType<typeof MenuListStore>
