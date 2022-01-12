import React, { useRef, useEffect, useState } from "react";

import SupportWindow from './SupportWindow'

import Avatar from './Avatar'

const SupportEngine = () => {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);
    const [visible, setVisible] = useState(false)

    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setVisible(false)
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    return (
        <div ref={wrapperRef}>
            <SupportWindow visible={visible} style={{ bottom: 0 }} />
            <Avatar 
                onClick={() => setVisible(true)}
                style={{
                    position: 'fixed',
                    right: 24,
                    bottom: 50
                }}
            />
        </div>
    )
}

export default SupportEngine;

