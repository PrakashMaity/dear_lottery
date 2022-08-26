export const phoneNumber_check = (val) => {
    const pattern = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (val == '' || val.trim('') == '') {
      return [false, 'Enter Your phone Number'];
    } else if (val.length != 10 || pattern.test(val)) {
      return [false, 'Enter Your valid phone Number'];
    } else {
      return [true, 'ok'];
    }
  };