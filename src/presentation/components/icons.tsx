export function ArrowIcon() { return <svg aria-hidden="true" className="arrow-icon" viewBox="0 0 20 20"><path d="M3 10h13M11 5l5 5-5 5" /></svg> }

export function ChevronDownIcon() { return <svg aria-hidden="true" className="size-3.5 fill-none stroke-current stroke-[1.8]" viewBox="0 0 20 20"><path d="m5 7.5 5 5 5-5" /></svg> }

export function MenuIcon({ open }: { open: boolean }) { return <svg aria-hidden="true" className="size-5 fill-none stroke-current stroke-[1.8]" viewBox="0 0 24 24"><path d={open ? 'M5 5l14 14M19 5 5 19' : 'M4 7h16M4 12h16M4 17h16'} /></svg> }
