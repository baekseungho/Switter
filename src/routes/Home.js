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

//porps를 router에서 받아옴
const Home = ({ userObj }) => {
  //두 state 모두 form을 위함
  const [sweet, setSweet] = useState("");
  const [sweets, setSweets] = useState([]); //Component가 mount 될 때 getSweets실행  이는 dbSercice를 불러와서 collection"sweets" 그리고 get으로 다 가져옴

  useEffect(() => {
    const q = query(
      collection(dbService, "sweets"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const sweetArr = snapshot.docs.map((document) => ({
        //새로운 스냅샷을 받을 때 배열을 만든다
        id: document.id,
        ...document.data(),
      })); // 배열들은 이렇게 생겼다
      setSweets(sweetArr); // state에 배열을 집어넣음
    });
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const docRef = await addDoc(collection(dbService, "sweets"), {
        text: sweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
      });
    } catch (e) {
      console.error("Error adding document:", e);
    }
    setSweet("");
  };
  const onChange = (event) => {
    // 'event로부터' 라는 의미, 즉 event안에 있는 target 안에 있는 value를 달라고 하는것
    const {
      target: { value },
    } = event;
    setSweet(value);
  };
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0]; //파일을가지고 reader를 만든다음
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      console.log(finishedEvent);
    };
    reader.readAsDataURL(theFile); //readAsDataURL 을 사용하여 파일을 읽는다
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
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Sweet" />
      </form>
      <div>
        {sweets.map((sweet) => {
          return (
            <Sweet
              key={sweet.id}
              sweetObj={sweet} // sweetObj는 sweet의 모든 데이터 author, text, createdAt
              isOwner={sweet.creatorId === userObj.uid} //다이다믹한 prop 때론 true 대론 false sweet을 만든사람과 swerObj.uid가 같으면 true
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
