import React, { useState, useEffect } from 'react';
import ListItem from './ListItem';
import 'antd/dist/antd.min.css';
import { Popconfirm } from 'antd';
import * as Styled from './List.styled';

const List = ({ listName }) => {
  const [items, setItems] = useState(
    JSON.parse(window.localStorage?.items ?? '[]')
  );
  const [showPopconfirm, setShowPopconfirm] = useState(false);
  const [showAdd, setShowAdd] = useState(true);

  /* new item with default values, use for adding */
  const newItem = {
    id: `${Math.random() * 1000}`,
    title: '',
    completed: false,
  };

  const onAddItem = (event) => {
    event.preventDefault();
    /* do not show the add button to prevent adding another item without finishing the current item */
    setShowAdd(false);
    setItems([...items, newItem]);
  };

  const onUpdateItem = (updatedItem) => {
    const tempList = [...items];
    const targetIndex = items.findIndex((item) => item.id === updatedItem.id);
    if (updatedItem.title.length === 0) {
      /* delete an empty title and show add button, probably user wants to stop adding */
      onDeleteItem(updatedItem);
      setShowAdd(true);
    } else {
      tempList[targetIndex] = updatedItem;
      if (!showAdd) {
        /* push another newItem if in adding state */
        tempList.push(newItem);
      }
      setItems(tempList);
    }
  };

  const onDeleteItem = (itemToDel) => {
    setItems(items.filter((item) => item.id !== itemToDel.id));
  };

  const onDeleteItems = () => {
    const tempList = items.filter((item) => item.completed === false);
    setItems(tempList);
  };

  const onPopupVisibleChange = (show) => {
    if (!show || items.length === 0) {
      setShowPopconfirm(false);
      return;
    }

    const tempList = items.filter((item) => item.completed === true);
    if (tempList.length === 0) {
      setShowPopconfirm(true);
    }
  };

  const onPopupConfirm = () => {
    if (!showPopconfirm) return;

    /* User confirmed to clear the list */
    new Promise((resolve) => {
      setItems([]);
    });
  };

  /* Listen to any changes of items and save in the localStorage */
  useEffect(() => {
    console.log('Value to set: ', items);
    const json = JSON.stringify(items);
    window.localStorage.setItem('items', json);
  }, [items]);

  return (
    <Styled.MainDiv>
      <Styled.H1>{listName}</Styled.H1>
      {items.map((listItem, index) => (
        <ListItem
          key={listItem.id}
          item={listItem}
          onUpdateItem={onUpdateItem}
          onDeleteItem={onDeleteItem}
        />
      ))}
      <Styled.HideShowDiv showAdd={showAdd} onClick={onAddItem}>
        <Styled.IconButton>
          <Styled.IconSpan className="material-icons">add</Styled.IconSpan>
        </Styled.IconButton>
      </Styled.HideShowDiv>
      {items.length !== 0 && (
        <Styled.FlexDiv>
          <Popconfirm
            title="Do you want to clear the list?"
            visible={showPopconfirm}
            onConfirm={onPopupConfirm}
            onVisibleChange={onPopupVisibleChange}
          >
            <Styled.ActionButton onClick={onDeleteItems}>
              Delete
            </Styled.ActionButton>
          </Popconfirm>
        </Styled.FlexDiv>
      )}
    </Styled.MainDiv>
  );
};

export default List;
