import { useId, useEffect, useRef, PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

export type ModalProps = PropsWithChildren & {
	isOpen: boolean;
	onSetIsOpen: (isOpen: boolean) => void;
};

// We get an element we created in our `index.html` file with the id
// `modal-root`. This is the element we want to render our modal into.
const modalRoot = document.getElementById("modal-root");
if (!modalRoot) {
	// Since we need modal root in order for this to work, we can just
	// throw an error if its not found. This way, Typescript will know
	// that the `modalRoot` variable cannot be null
	throw Error("Must add element with id `modal-root` to the DOM");
}

const Modal = ({ isOpen, children, onSetIsOpen }: ModalProps) => {
	// refs let us store values that persist accross multiple renders
	// without having to use state. Here we use refs to store a reference
	// to our element and keep track of if we have already initialised
	// our modal in the DOM.
	const elementHasBeenAppendedRef = useRef(false);
	const modalContainerElementRef = useRef<HTMLElement>(
		document.createElement("div"),
	);

	// `useEffect` lets us run functions at certain points in our
	// components lifecycle. Don't worry about understanding this
	// fully right now.
	useEffect(() => {
		// When the component first renders, we initialise our modal
		if (!elementHasBeenAppendedRef.current) {
			modalRoot.append(modalContainerElementRef.current);
			elementHasBeenAppendedRef.current = true;
		}

		return () => {
			// When the component gets unrendered, we remove it from
			// the DOM.
			modalContainerElementRef.current?.remove();
			elementHasBeenAppendedRef.current = false;
		};
	}, []);

	// `createPortal` lets us render elements inside a specific HTML
	// element of our choice. In this case, we render to our `modalRoot`
	// element that we fetched earlier. Doing this makes sure that the
	// styling of our modal is consistent and won't be affected by the
	// styles of surrounding elements.
	return createPortal(
		isOpen && (
			<div className={styles.backdrop} onClick={() => onSetIsOpen(false)}>
				<div className={styles.card} onClick={(e) => e.stopPropagation()}>
					{children}
				</div>
			</div>
		),
		modalContainerElementRef.current,
	);
};

export default Modal;
