'use client'; //основной компонент, где происходит вся логика с таблицей

import { Card, Label, Loader, Pagination, Table, TextInput, withTableActions, withTableSorting } from '@gravity-ui/uikit';
import * as Api from '../RESTapi';
import React, { useState } from 'react';
import { AdminModal } from '../AdminModal';
import { Sample } from '../dataObjectSample';
export const MainTable = ({Update, isAdmin, onChange}) => {
    const columns = [ //задания колонн для таблицы
        {id: 'id', },
        {id: 'name', name: 'Имя', width: 1, meta: {sort:true}},
        {id: 'desc', name: 'Описание', },
        {id: 'dateTime', name: 'Дата и время добавления', meta:{sort:true}},
        {id: 'rating', name: 'Рейтинг', meta:{sort:true}},
        {id: 'picture', name: 'Фото'},
        {id: 'placeText', name: 'Местоположение'},
        {id: 'coordinates', name: 'Координаты'},
        {id: 'mapLink', name: 'Ссылка на Google Maps'},
        {id: 'status', name: 'Состояние', meta:{sort:true}}
    ]

    const [currentObj, setCurObj] = useState(0); //выбраный объект страницы для действий админа над ним

    const FancyPlacesTable = withTableSorting(withTableActions(Table)); //создание объекта таблицы

    const [searchValue, setSearchValue] = React.useState(''); //значение для поиска по названию

    // Номер конкретной страницы в пагинации
    const [currentPage, setCurrentPage] = React.useState(1);

    // Количество элементов на странице
    const [totalPages, setTotalPages] = React.useState(1);

    // Список достопримечательностей
    const [items, setItems] = React.useState([]);

    // Загрузка
    const [isLoading, setLoading] = React.useState(false);

    // Готовность приложения
    const [isReady, setReady] = React.useState(false);

    // Открыта ли модал
    const [openMod, setOpenMod] = useState(false);

    // Загрузка пицц с Mokky при первом рендере и при изменении параметров
    React.useEffect(() => {
        const fetchItems = async () => {
            try {
                setLoading(true);

                // Лимит отображаемых достопримечательностей
                const limit = 3;

                const response = await Api.getAll({ //отправляем запрос на получение всех объектов из api
                    limit,
                    page: currentPage,
                    ...(searchValue && { name: searchValue + '*' }),
                });

                setItems(response.items); //закидываем их в локальную переменную 
                setTotalPages(response.meta.total_items); //всего объектов для пагинации

            } catch (error) {
                // Обработка ошибки получения записей
                console.error(error);
                setItems([]);
                setTotalPages(1);
            } finally {
                setLoading(false);
            }
        };

        fetchItems().finally(() => {
            setReady(true);
        });
    }, [searchValue, currentPage, Update]);


    // Если приложение не готово, вернем заглушку
    if (!isReady) {
        return (
            <Loader />
        );
    }

    // Для обработки смены страницы
    function handlePageChange(page:number) {
        setCurrentPage(page);
      }
    
    let windowW = window.innerWidth - window.innerWidth*0.03 //для постоянной длины таблицы
    return (
        <Card>
            <main style={{width:windowW}}>
                {openMod && <AdminModal onChange={onChange} open={openMod} setOpen={setOpenMod} isForCreating={false} objId={currentObj}/>}
                <TextInput onUpdate={(ctx) => {setSearchValue(ctx)}} endContent={isLoading && <Loader size="s" />} type='search' placeholder='Поиск достопримечательности по имени...'/>
                <FancyPlacesTable data={ //берем полученные объекты, загоняем их через образец а оттуда в таблицу
                    items.map((item) => (Sample(item.id, item.name, item.desc, item.dateTime, item.rating, item.picture, item.placeText, item.coordinates, item.status)))
                } columns={columns} getRowActions={(item) => {
                        if(isAdmin){ //проверка на админа, если админ, доступ к действиям над таблицей
                            return [
                                {
                                    text: `Изменить`,
                                    handler: () => {setOpenMod(true); setCurObj(item.id)},
                                },
                                {
                                    text: 'Удалить',
                                    handler: () => {Api.del(item.id).then(() => {onChange()})},
                                },
                            ]
                        }else{
                            return [
                                {
                                    text: '',
                                    handler: () => {},
                                }
                            ]
                        }
                    }}/>
                <Label theme='info'>Всего достопримечательностей: {totalPages}</Label>
                <Pagination page={currentPage} total={totalPages} pageSize={3} onUpdate={handlePageChange}/>
            </main>
        </Card>  
    );
};
