import React from 'react'
import Select from 'react-select'
import { useState } from 'react'
import { themeOptions } from '../Uitls/themeOptions'
import { useTheme } from '../Context/ThemeContext'

const Footer = () => {

    const {setTheme,theme} = useTheme();


    const handleChange = (e)=>{
        
        setTheme(e.value);
        localStorage.setItem("theme",JSON.stringify(e.value));
    }
  return (
    <div className="footer">
        <div className="links">
            Links
        </div>
        <div className="themeButton">
            <Select
                onChange={handleChange}
                options={themeOptions}
                menuPlacement='top'
                defaultValue={{label: theme.label, value:theme.value}}
                styles={{
                    control : styles =>({...styles,backgroundColor:theme.background,color:theme.typeBoxText}),
                    menu : styles=>({...styles,backgroundColor:theme.background}),
                    option : (styles,{isFocused}) =>{
                        return {
                            ...styles,
                            backgroundColor : (!isFocused) ? theme.background : theme.typeBoxText,
                            color : (!isFocused) ? theme.typeBoxText : theme.background,
                            cursor:'pointer'
                        }
                    }
                }}
            />
        </div>
     
      
    </div>
  )
}

export default Footer
