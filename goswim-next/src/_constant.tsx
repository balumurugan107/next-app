import jsHttpCookie from 'cookie';

export const gsTokenKey = "GS_NEKOT" 

export const gsSubscriptionKey = "GS_NEKOT_NOITPIRCSBUS" 

export const gsSubscriptionValue = "GS_NOITPIRCSBUS_KPBSM" 

export const gsTimezoneValue = "GS_TIMEZONE" 

export const gsUserRole = "GS_ELOR_REUS" 

export enum gsUserTypeKeyEnum {
  SWIMMER = 'GS_YEK_HRGEFMEMDICWBSA',
  COACH = 'GS_YEK_FHECDACOBCA',
  ADMIN = 'GS_YEK_FNEIDMCDBAA'
}

export enum gsUserTypeEnum {
    SWIMMER = 'GS_HRGEFMEMDICWBSA',
    COACH = 'GS_FHECDACOBCA',
    ADMIN = 'GS_FNEIDMCDBAA'
}


export const getTokenFromCookie = (req : any) => {
    let key = ""
    if (req && (req.cookies ||  req.headers.cookie)) {
  
      const cookies = req.cookies? req.cookies : req.headers.cookie;
     ``
      
      if(cookies && typeof cookies === 'object'){
      key = cookies[gsTokenKey]
      }else if(cookies && typeof cookies === 'string'){
        const cookiesJSON = jsHttpCookie.parse(cookies);
         key = cookiesJSON[gsTokenKey]
      }
      
    }
    return key
  }

  export const getCookieUsingKey = async (req : any, keyName: string) => {
    let key = ""
    if (req && (req.cookies ||  req.headers.cookie)) {
  
      const cookies = req.cookies? req.cookies : req.headers.cookie;
     ``

      if(cookies && typeof cookies === 'object'){
      key = cookies[keyName]
      }else if(cookies && typeof cookies === 'string'){
        const cookiesJSON = jsHttpCookie.parse(cookies);
         key = cookiesJSON[keyName]
      }
      
    }
    return key
  }