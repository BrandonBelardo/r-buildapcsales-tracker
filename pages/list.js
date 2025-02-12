import { useState } from "react";
import styled from "styled-components";
import Link from 'next/link';

// Styled components
const Container = styled.div`
  width: 300px;
  margin: 20px auto;
  text-align: center;
`;

const Input = styled.input`
  padding: 8px;
  margin-right: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 8px 12px;
  background-color: #3498db;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #2980b9;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  padding: 10px;
  margin: 5px 0;
  background-color: ${(props) => (props.index % 2 === 0 ? "#5C6090" : "#5C8490")};
  color: white;
  border-radius: 5px;
  transition: background-color 0.2s;
  
  &:hover{
    background-color:rgb(63, 155, 60);
  }
`;

export default function DynamicList() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddItem = () => {
    if (inputValue.trim() !== "") {
      setItems([...items, inputValue]); // Add new item
      setInputValue(""); // Clear input
    }
  };

  return (
    <Container>
      <h2><Link href="/">Home</Link></h2>
      <h2>Dynamic List</h2>
      <Input
        type="text"
        placeholder="Enter an item..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button onClick={handleAddItem}>Add</Button>

      <List>
        {items.map((item, index) => (
          <ListItem key={index} index={index}>
            {item}
          </ListItem>
        ))}
      </List>
    </Container>
  );
}