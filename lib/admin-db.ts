// Client-side helpers for admin panel storage/auth using localStorage
function isClient() {
  return typeof window !== "undefined";
}

export function isLoggedIn(): boolean {
  if (!isClient()) return false;
  return JSON.parse(localStorage.getItem("adminLoggedIn") || "false");
}

export function setLoggedIn(val: boolean) {
  if (!isClient()) return;
  localStorage.setItem("adminLoggedIn", JSON.stringify(!!val));
}

export function getSiteConfig(): any {
  if (!isClient()) return {};
  try {
    return JSON.parse(localStorage.getItem("siteConfig") || "{}");
  } catch (e) {
    return {};
  }
}

export function getNewsList(): any[] {
  if (!isClient()) return [];
  try {
    return JSON.parse(localStorage.getItem("newsList") || "[]");
  } catch (e) {
    return [];
  }
}

export function saveNewsList(arr: any[]): boolean {
  if (!isClient()) return false;
  try {
    localStorage.setItem("newsList", JSON.stringify(arr));
    return true;
  } catch (e) {
    return false;
  }
}

export function setCurrentUser(user: any | null) {
  if (!isClient()) return;
  if (user === null) {
    localStorage.removeItem("currentUser");
  } else {
    localStorage.setItem("currentUser", JSON.stringify(user));
  }
}

export function getCurrentUser(): any | null {
  if (!isClient()) return null;
  try {
    return JSON.parse(localStorage.getItem("currentUser") || "null");
  } catch (e) {
    return null;
  }
}

export function logout() {
  if (!isClient()) return;
  localStorage.removeItem("currentUser");
  localStorage.setItem("adminLoggedIn", JSON.stringify(false));
}
