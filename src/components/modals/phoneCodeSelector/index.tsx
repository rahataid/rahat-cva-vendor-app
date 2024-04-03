import React, { useState } from 'react';
import { IonContent, IonHeader, IonItem, IonList, IonTitle, IonSearchbar, IonToolbar } from '@ionic/react';
import { SelectOptionItem } from 'models/select-option.item';
import './index.css';

interface SelectOptionProps {
  items: SelectOptionItem[];
  selectedItem: string;
  title?: string;
  searchPlaceholder?: string;
  onSelectionCancel?: () => void;
  onSelectionChange?: (item: Omit<SelectOptionItem, 'text'>) => void;
}

function PhoneCodeSelector(props: SelectOptionProps) {
  const [filteredItems, setFilteredItems] = useState<SelectOptionItem[]>([...props.items]);

  const cancelChanges = () => {
    const { onSelectionCancel } = props;
    if (onSelectionCancel !== undefined) {
      onSelectionCancel();
    }
  };

  const confirmSelection = (item: SelectOptionItem) => {
    const { onSelectionChange } = props;
    if (onSelectionChange !== undefined) {
      onSelectionChange(item);
    }
  };

  const searchbarInput = (ev: any) => {
    filterList(ev.target.value);
  };

  const filterList = (searchQuery: string | null | undefined) => {
    if (searchQuery === undefined || searchQuery === null) {
      setFilteredItems([...props.items]);
    } else {
      const normalizedQuery = searchQuery.toLowerCase();
      setFilteredItems(
        props.items.filter((item) => {
          return item.text.toLowerCase().includes(normalizedQuery);
        }),
      );
    }
  };

  return (
    <>
      <IonHeader className="select-option-modal-header">
        <IonToolbar className="select-option-modal-header">
          <IonTitle className="select-option-modal-text">{props.title}</IonTitle>
        </IonToolbar>
        <IonSearchbar
          className="select-option-modal-search-bar"
          placeholder={props.searchPlaceholder}
          onIonInput={searchbarInput}
        ></IonSearchbar>
      </IonHeader>

      <IonContent color="light">
        <IonList inset={true} className="ion-no-padding select-option-modal-ion-list">
          {filteredItems.map((item, idx) => (
            <IonItem key={`${item.value}-${idx}`} onClick={() => confirmSelection(item)}>
              {item.text}
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </>
  );
}
export default PhoneCodeSelector;
