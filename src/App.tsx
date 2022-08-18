import { useState } from "react";
import Modal from "./components/Modal";
import styles from "./App.module.css";

function App() {
	const [modalIsOpen, setModalIsOpen] = useState(false);

	return (
		<div className={styles.root}>
			<button onClick={() => setModalIsOpen(true)}>Open Modal</button>
			<Modal isOpen={modalIsOpen} onSetIsOpen={setModalIsOpen}>
				Any content here gets rendered inside the modal!
			</Modal>
		</div>
	);
}

export default App;
