import { Button, Menu, MenuItem } from '@mui/material';
import Link from 'next/link';
import { useReducer, useRef } from 'react';
import { languages, useTr } from '~/texts';

export function LangMenu() {
    const [, i18n] = useTr('app');
    const [menuOpen, toggleMenu] = useReducer(x => !x, false);
    const anchor = useRef(null);

    return (
        <>
            <Button ref={anchor} color="secondary" variant="text" onClick={toggleMenu}>
                {i18n.language.toUpperCase()}
            </Button>
            <Menu keepMounted anchorEl={anchor.current} open={menuOpen} onClose={toggleMenu}>
                {languages.map(lang => (
                    <Link key={lang.key} href="" passHref locale={lang.key}>
                        <MenuItem
                            onClick={() => {
                                i18n.changeLanguage(lang.key);
                                toggleMenu();
                            }}
                        >
                            {lang.title}
                        </MenuItem>
                    </Link>
                ))}
            </Menu>
        </>
    );
}
