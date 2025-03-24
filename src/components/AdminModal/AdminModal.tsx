'use client'; //компонент для отрисовки модела для создания/изменения достопримечательности

import { Button, Card, Label, Modal, TextInput } from '@gravity-ui/uikit';
import React, { useState } from 'react';
import { edit, post } from '../RESTapi';
export const AdminModal = ({onChange, open, setOpen, isForCreating, objId}) => {

    const [openFinish, setOpenFinish] = useState(false); //на закрытие модал об окончании процесса добавления

    const [isValid, setIsvalid] = useState(false) //для проверки на валидность поля с рейтингом

    const checkRating = (text: string) => { //соответственно функция проверки
        if(!Number.isNaN(parseFloat(text)) && parseFloat(text) >= 1 && parseFloat(text) <= 5){
            setIsvalid(true);
        }else{setIsvalid(false);}
    }

    const [name, setName] = useState(''); //блок свойств для передачи их в компонент для таблицы
    const [desc, setDesc] = useState('');
    const [rating, setRating] = useState(1.0);
    const [picture, setPic] = useState('');
    const [place, setPlace] = useState('');
    const [coords, setCords] = useState('');

    let today  = new Date(); //для отображения даты

    const newFancyPlace = { //этакий префаб который потом будет добавляться в наш сервис
        name: name,
        desc: desc,
        dateTime: today.toLocaleDateString("ru", {hour: 'numeric', minute: 'numeric'}),
        rating: rating,
        picture: picture,
        placeText: place,
        coordinates: coords,
        mapLink: '',
        status: 'Осмотрена'
    };

    return ( //отрисовка модела, при завершении и проверки отправка в api
        <Modal open={open} onClose={() => {setOpen(false); setIsvalid(false);}}>  
            <h2>{isForCreating? 'Добавление достопримечательности': 'Изменение достопримечательности'}</h2>
            <Card style={{}}>
                <TextInput onUpdate={(ctx) => {setName(ctx)}} size='l' placeholder='Имя достопримечательности...'/>
                <TextInput onUpdate={(ctx) => {setDesc(ctx)}} size='l' placeholder='Описание...'/>
                <TextInput onUpdate={(ctx) => {checkRating(ctx); setRating(parseFloat(ctx))}} size='l' endContent={!isValid && <Label theme='danger'>Рейтинг должен быть в диапазоне от 1 до 5</Label>} placeholder='Рейтинг...'/>
                <TextInput onUpdate={(ctx) => {setPic(ctx)}} size='l' placeholder='Ссылка на изображение достопримечательности...'/>
                <TextInput onUpdate={(ctx) => {setPlace(ctx)}} size='l' placeholder='Местоположение...'/>
                <TextInput onUpdate={(ctx) => {setCords(ctx)}} size='l' placeholder='Координаты местоположения...'/>
                <Button size='l' onClick={() => {setOpenFinish(true)}}>{isForCreating? 'Добавить достопримечательность':'Изменить достопримечательность'}</Button>
                {isValid? (
                    <Modal open={openFinish} onClose={() => {setOpenFinish(false); setOpen(false); setIsvalid(false); if(isForCreating){post(newFancyPlace).then(() => {onChange();})}else{edit(newFancyPlace, objId).then(() => {onChange();})}}}>{isForCreating? 'Достопримечательность успешно добавлена':'Достопримечательность успешно изменена'}</Modal>
                ):(
                    <Modal open={openFinish} onClose={() => setOpenFinish(false)}>Исправьте все ошибки в указаных значениях</Modal>
                )}
                
            </Card>
        </Modal>    
    );
};