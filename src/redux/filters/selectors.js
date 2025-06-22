

export const selectNameFilter = (state) => state.filters.name;

export const selectFilteredContacts = (state) => {
    const filter = state.filters.name.toLowerCase().trim();
  
    return state.contacts.items.filter(({ name, number }) =>
      name.toLowerCase().includes(filter) ||
      number.toLowerCase().includes(filter)
    );
  };