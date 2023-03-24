import { async } from "@firebase/util";
import { dbService } from "fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";

const Sweet = ({ sweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false); // sweet을 수정하고 있는지 아닌지를 의미
  const [newSweet, setNewSweet] = useState(sweetObj.text); //input값 수정
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you wnat to delete this sweet?");
    if (ok);
    {
      await deleteDoc(doc(dbService, `sweets/${sweetObj.id}`));
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();

    await updateDoc(doc(dbService, `sweets/${sweetObj.id}`), {
      text: newSweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewSweet(value);
  };

  return (
    <div>
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  placeholder="Edit your sweet"
                  value={newSweet}
                  required
                  onChange={onChange}
                />
                <input type="submit" value="Update Sweet" />
              </form>
              <button onClick={toggleEditing}>Cancel</button>
            </>
          )}
        </>
      ) : (
        <>
          <h4>{sweetObj.text}</h4>
          {/* 글의 주인일때만 볼수 있는 조건 */}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Sweet</button>
              <button onClick={toggleEditing}>Edit Sweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Sweet;
