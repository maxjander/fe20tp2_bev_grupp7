import { useEffect, useState } from 'react';
import localPars from "./currTheme";

export const useDarkMode = () => {



  //  var authLocal = localStorage.getItem('authUser');
   // var localPars = JSON.parse(authLocal);



    const [theme, setTheme] = useState(localPars.theme);
    
    const [componentMounted, setComponentMounted] = useState(false);


    const setMode = mode => {
        localPars.theme = mode
        window.localStorage.setItem('authUser', JSON.stringify(localPars))
        setTheme(mode)
    };

    const toggleTheme = () => {
        if (theme ==='light') {
            setMode( 'dark')
        } else {
            setMode('light')
        }
    };

    useEffect(() => {
        const localTheme = localPars.theme;
        window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !localTheme ?
            setMode('dark') :
            localTheme ?
                setTheme(localTheme) :
                setMode('light'); 
            setComponentMounted(true)
    }, [setMode]);

    return [theme, toggleTheme, componentMounted]
};