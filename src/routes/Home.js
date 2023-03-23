import { dbService } from "fbase";
import React, { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  getDocs,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import Sweet from "components/Sweet";

const Home = ({ userObj }) => {
  const [sweet, setSweet] = useState("");
  const [sweets, setSweets] = useState([]); //Component가 mount 될 때 getSweets실행  이는 dbSercice를 불러와서 collection"sweets" 그리고 get으로 다 가져옴

  useEffect(() => {
    const q = query(
      collection(dbService, "sweets"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const sweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSweets(sweetArr);
    });
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    const docRef = await addDoc(collection(dbService, "sweets"), {
      text: sweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setSweet("");
  };
  const onChange = (event) => {
    // 'event로부터' 라는 의미, 즉 event안에 있는 target 안에 있는 value를 달라고 하는것
    const {
      target: { value },
    } = event;
    setSweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={sweet}
          onChange={onChange}
          type="text"
          placeholder="what's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Sweet" />
      </form>
      <div>
        {sweets.map((sweet) => (
          <Sweet key={sweet.id} sweetOnj={sweet} />
        ))}
      </div>
    </div>
  );
};

export default Home;
