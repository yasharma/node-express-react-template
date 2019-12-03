class Storage {
  static set(key: string, val: any) {
    try {
      sessionStorage.setItem(key, JSON.stringify(val));
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  static get(key: string) {
    const result = sessionStorage.getItem(key);
    if(!result) return undefined;
    return JSON.parse(result);
  }

  static remove(key: string) {
    sessionStorage.removeItem(key);
    return true;
  }

  static clear() {
    sessionStorage.clear();
    return true;
  }
}

export default Storage;