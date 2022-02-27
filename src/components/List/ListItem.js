import { useState } from 'react';
import * as Styled from './ListItem.styled';

const ListItem = ({ item, onUpdateItem, onDeleteItem }) => {
  const [currValue, setCurrValue] = useState(item.title);
  const [isEditing, setIsEditing] = useState(item.title === '');
  const [isChecked, setChecked] = useState(item.completed);

  const onSubmit = (event) => {
    event.preventDefault();
    onUpdateItem({
      ...item,
      title: currValue,
    });
    setIsEditing(false);
  };

  const onCheckboxChange = (event) => {
    const newValue = !isChecked;
    setChecked(newValue);
    onUpdateItem({
      ...item,
      completed: newValue,
    });
  };

  return (
    <Styled.FlexDiv>
      <Styled.Form onSubmit={onSubmit} tabIndex={0}>
        <Styled.CheckBox
          type="checkbox"
          name="itemBox"
          checked={isChecked}
          onChange={onCheckboxChange}
        />
        {isEditing && !isChecked ? (
          <Styled.Input
            name="item"
            autoFocus
            value={currValue}
            onBlur={onSubmit}
            onChange={(evt) => setCurrValue(evt.target.value)}
          />
        ) : (
          <Styled.Span isChecked={isChecked} onClick={() => setIsEditing(true)}>
            {item.title}
          </Styled.Span>
        )}
        {item.title.length > 0 && (
          <Styled.IconButton type="button">
            <Styled.IconSpan
              onClick={() => onDeleteItem(item)}
              className="material-icons"
            >
              delete
            </Styled.IconSpan>
          </Styled.IconButton>
        )}
      </Styled.Form>
    </Styled.FlexDiv>
  );
};

export default ListItem;
