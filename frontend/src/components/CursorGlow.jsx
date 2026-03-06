import { useEffect, useState } from 'react';

export default function CursorGlow() {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPos({ x: e.clientX, y: e.clientY });
            setVisible(true);
        };

        const handleMouseLeave = () => setVisible(false);

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div
            className="cursor-glow"
            style={{
                left: pos.x,
                top: pos.y,
                opacity: visible ? 1 : 0,
            }}
        />
    );
}
