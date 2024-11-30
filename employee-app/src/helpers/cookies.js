export function getCookie (cookie) {
    const cookies = document.cookie.split('; ');

    const cookieMap = {};
    cookies.forEach(cookie => {
        const [name, value] = cookie.split('=');
        cookieMap[name] = value;
    });
    const cookieVal = cookieMap[cookie];
    return cookieVal
}

export function deleteCookie(name) {
    console.log(name)
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
  }

