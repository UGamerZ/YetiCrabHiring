'use client'; //компонент обёртки приложения

import React, { useState } from 'react';
import block from 'bem-cn-lite';
import {Button, Card, Icon, Theme, ThemeProvider} from '@gravity-ui/uikit';
import {Moon, Sun} from '@gravity-ui/icons';

import './Wrapper.scss';
import { AdminModal } from '../AdminModal';
import { MainTable } from '../MainTable';
import { Header } from '../Header';
const b = block('wrapper');

const DARK = 'dark'; //переменные тем
const LIGHT = 'light';
const DEFAULT_THEME = DARK;

export const DEFAULT_BODY_CLASSNAME = `g-root g-root_theme_${DEFAULT_THEME}`;

export const Wrapper = () => {
    const [theme, setTheme] = React.useState<Theme>(DEFAULT_THEME); //переключатель темы

    const isDark = theme === DARK; //проверка на темную тему

    const [openMod, setOpenMod] = useState(false); //для открытия модал админа

    const [isAdmin, setAdmin] = useState(false); //для отслеживания текущего пользователя

    const [onChange, setChange] = useState(false); //для отслеживания смены пользователя
    
    const changeUser = () => { //функция-переключатель пользователя
        if(isAdmin){
            setAdmin(false)
        }
        else{setAdmin(true)}
    }

    const Change = () =>{ //подобная функция свыше
        if(onChange == true){
            setChange(false);
        }else{setChange(true)}
    }
    
    //отрисовка приложения, оборачивание всех компонентов, логика для смены пользователя
    return ( 
        <ThemeProvider theme={theme}>
            <div className={b()}>
                <div className={b('theme-button')}>
                    <Button style={{marginRight:'2%'}}
                        size="l"
                        view="outlined"
                        onClick={() => {
                            setTheme(isDark ? LIGHT : DARK); //смена темы
                        }}
                    >
                        <Icon data={isDark ? Sun : Moon} />
                    </Button>
                    {isAdmin? (<>
                        <Button style={{marginRight:'2%'}} onClick={() => setOpenMod(true)}>Добавить достопримечательность</Button>
                        <AdminModal onChange={Change} open={openMod} setOpen={setOpenMod} isForCreating={true} objId={0} />
                    </>):(<></>)}
                    <Button  onClick={changeUser}>{isAdmin?(<>Перейти в режим пользователя</>):(<>Перейти в режим администратора</>)}</Button>
                </div>
                <Card>
                    <div className={b('layout')}>
                        <div className={b('content')}>
                            <Header/>
                            <MainTable Update={onChange} onChange={Change} isAdmin={isAdmin}/>
                        </div>
                    </div>
                </Card>
            </div>
        </ThemeProvider>
    );
};
