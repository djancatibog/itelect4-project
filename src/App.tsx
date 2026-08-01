// src/App.tsx
import ItemCard from "./components/ItemCard";
import UserCard from "./components/UserCard";
import ClaimBadge from "./components/ClaimBadge";
import type { User, Item, Claim } from "./types/index";
import { ItemStatus, ClaimStatus } from "./types/index";
import { useState, useEffect, useRef } from "react";
import useToggle from "./hooks/useToggle";
import usePrevious from "./hooks/usePrevious";


const admin: User = {
  id: 1,
  name: "Security Office",
  email: "security@campus.edu",
  role: "security_admin",
  isActive: true,
};

const student: User = {
  id: 2,
  name: "Juan dela Cruz",
  email: "juan@example.com",
  role: "student",
  isActive: true,
};

const item: Item = {
  id: 1,
  description: "Black umbrella left in Room 302",
  location: "Room 302",
  type: "found",
  reportedBy: admin.id,
  reportedAt: new Date(),
  status: ItemStatus.Open,
};

const claim: Claim = {
  id: 1,
  itemId: item.id,
  claimantId: student.id,
  submittedAt: new Date(),
  status: ClaimStatus.Pending,
};

function App() {
  // ===== TYPED STATE WITH useState<T> =====
const [selectedUser, setSelectedUser] = useState<User | null>(null);
const [items, setItems] = useState<Item[]>([]);
const [isLoading, setIsLoading] = useState<boolean>(true);

// ===== LOADING MOCK DATA WITH useEffect =====
useEffect(() => {
  setTimeout(() => {
    setItems([item]);   // reusing your existing mock "item"
    setIsLoading(false);
  }, 500);
}, []);

  // ===== TYPED DOM REFERENCE WITH useRef =====      //
    const searchInputRef = useRef<HTMLInputElement>(null); 

    // ===== TYPED DOM EVENTS INSIDE HOOKS =====
    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {   
    setSearchTerm(e.target.value); 
     };

     const filteredItems = items.filter((i) =>
       i.description.toLowerCase().includes(searchTerm.toLowerCase())
     );

      // ===== CUSTOM HOOKS =====                                    
  const [showDetails, toggleDetails] = useToggle(false);         
  const previousSearch = usePrevious(searchTerm);                

if (isLoading) {
  return <p>Loading items...</p>;
}

  return (
    <div className="app">
      <input
  ref={searchInputRef}
  value={searchTerm}
  onChange={handleSearchChange}
  type="text"
  placeholder="Search items..."
/>

{previousSearch !== undefined && previousSearch !== searchTerm && (   
        <p>Previous search: "{previousSearch}"</p>                          
      )}                                                                    
      <button onClick={toggleDetails}>{showDetails ? "Hide" : "Show"} Details</button>


      <ItemCard
        item={item}
        onSelect={(i) => console.log("Selected item:", i)}
      />
    
      <UserCard user={student} />
      <ClaimBadge claim={claim}>
        <p>Awaiting verification</p>
      </ClaimBadge>
    </div>
  );
}

export default App;