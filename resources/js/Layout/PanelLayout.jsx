import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import logoutIcon from '../../../public/img/logout.svg'
import avatar from '../../../public/img/avatar.png'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const navItems = [
    {
        label: 'Beranda',
        href: '/panel/dashboard',
        icon: (
            <svg className="w-4.5 h-4.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M112,56v48a8,8,0,0,1-8,8H56a8,8,0,0,1-8-8V56a8,8,0,0,1,8-8h48A8,8,0,0,1,112,56Zm88-8H152a8,8,0,0,0-8,8v48a8,8,0,0,0,8,8h48a8,8,0,0,0,8-8V56A8,8,0,0,0,200,48Zm-96,96H56a8,8,0,0,0-8,8v48a8,8,0,0,0,8,8h48a8,8,0,0,0,8-8V152A8,8,0,0,0,104,144Zm96,0H152a8,8,0,0,0-8,8v48a8,8,0,0,0,8,8h48a8,8,0,0,0,8-8V152A8,8,0,0,0,200,144Z" opacity="0.2"></path><path d="M200,136H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,200,136Zm0,64H152V152h48v48ZM104,40H56A16,16,0,0,0,40,56v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,104,40Zm0,64H56V56h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,64H152V56h48v48Zm-96,32H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm0,64H56V152h48v48Z"></path></svg>
        ),
    },
    {
        label: 'Artikel',
        href: '/panel/artikel',
        icon: (
            <svg className='w-4.5 h-4.5 flex-shrink-0' xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M216,48H40a8,8,0,0,0-8,8V216l32-16,32,16,32-16,32,16,32-16,32,16V56A8,8,0,0,0,216,48ZM112,160H64V96h48Z" opacity="0.2"></path><path d="M216,40H40A16,16,0,0,0,24,56V216a8,8,0,0,0,11.58,7.15L64,208.94l28.42,14.21a8,8,0,0,0,7.16,0L128,208.94l28.42,14.21a8,8,0,0,0,7.16,0L192,208.94l28.42,14.21A8,8,0,0,0,232,216V56A16,16,0,0,0,216,40Zm0,163.06-20.42-10.22a8,8,0,0,0-7.16,0L160,207.06l-28.42-14.22a8,8,0,0,0-7.16,0L96,207.06,67.58,192.84a8,8,0,0,0-7.16,0L40,203.06V56H216ZM136,112a8,8,0,0,1,8-8h48a8,8,0,0,1,0,16H144A8,8,0,0,1,136,112Zm0,32a8,8,0,0,1,8-8h48a8,8,0,0,1,0,16H144A8,8,0,0,1,136,144ZM64,168h48a8,8,0,0,0,8-8V96a8,8,0,0,0-8-8H64a8,8,0,0,0-8,8v64A8,8,0,0,0,64,168Zm8-64h32v48H72Z"></path></svg>
        ),
    },
    {
        label: 'Masukan',
        href: '/panel/feedback',
        icon: (
            <svg className='w-4.5 h-4.5 flex-shrink-0' xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M224,96V224l-39.58-32H88a8,8,0,0,1-8-8V144h88a8,8,0,0,0,8-8V88h40A8,8,0,0,1,224,96Z" opacity="0.2"></path><path d="M216,80H184V48a16,16,0,0,0-16-16H40A16,16,0,0,0,24,48V176a8,8,0,0,0,13,6.22L72,154V184a16,16,0,0,0,16,16h93.59L219,230.22a8,8,0,0,0,5,1.78,8,8,0,0,0,8-8V96A16,16,0,0,0,216,80ZM66.55,137.78,40,159.25V48H168v88H71.58A8,8,0,0,0,66.55,137.78ZM216,207.25l-26.55-21.47a8,8,0,0,0-5-1.78H88V152h80a16,16,0,0,0,16-16V96h32Z"></path></svg>
        ),
    },
];

export default function PanelLayout({ children }) {
    const { url, props } = usePage();
    const user = props.auth?.user;
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [logoutOpen, setLogoutOpen] = useState(false);
    const icon = logoutIcon

    // const isActive = (href) => url === href || url.startsWith(href + '/');
    const cleanUrl = url ? url.split('?')[0] : '';

    const isActive = (href) => cleanUrl === href || cleanUrl.startsWith(href + '/');

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">

            {/* --- Overlay Mobile (Hanya aktif di layar sm: max 639px) --- */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-gray-900/40 backdrop-blur-sm hidden sm:block"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* --- Sidebar Mobile (Hanya muncul di layar sm saat mobileOpen = true) --- */}
            <aside
                className={`
                    fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200                     flex-col h-screen select-none transition-transform duration-300 ease-in-out
                    hidden sm:flex
                    ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
            >
                {/* Header Mobile */}
                <div className="flex items-center h-16 px-4 border-b border-gray-100 justify-between">
                    <img src="/img/nutrizie-logo.svg" className="h-5" alt="Logo" />
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-50"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                {/* Nav Mobile */}
                <nav className="flex-1 pr-3 pl-4 py-4 space-y-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const active = isActive(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`relative flex items-center gap-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-prim/5 text-prim' : 'text-gray-600 hover:bg-gray-50/75 hover:text-gray-900'}`}
                                onClick={() => setMobileOpen(false)}
                            >
                                {active && <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-[3px] h-3/5 bg-prim rounded-r-md" />}
                                {item.icon}
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* --- Sidebar Desktop (Default Flex, tapi disembunyikan di sm: max 639px) --- */}
            <aside
                className={`
                    flex flex-col h-screen bg-white border-r border-gray-100 
                    transition-all duration-300 flex-shrink-0 select-none 
                    sm:hidden
                    ${collapsed ? 'w-16' : 'w-64'}
                `}
            >
                {/* Header: Logo + Toggle */}
                <div className={`flex items-center h-14 border-b border-gray-100 ${collapsed ? 'justify-start pl-5' : 'justify-between px-4 '}`}>
                    {!collapsed ? (
                        <div className="flex items-center justify-between w-full transition-all pl-2 pr-1">

                            <img src="/img/nutrizie-logo.svg" className="h-5" alt="Logo" />
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        onClick={() => setCollapsed(true)}
                                        className="p-1.5 cursor-pointer rounded-lg text-gray-300 hover:text-gray-400 hover:bg-gray-50 transition-colors focus:outline-none"
                                    >

                                        <svg className="w-4.5 h-4.5" width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.5 17.5L6.5 6.5M7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    <p className="text-xs text-prim">Collapse Sidebar</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    ) : (
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    onClick={() => setCollapsed(false)}
                                    className="p-1 rounded-xl cursor-pointer hover:bg-gray-50 transition-all duration-200 focus:outline-none group active:scale-95"
                                >
                                    <img src="/img/nutrizie-icon.svg" className="h-5 w-5 transition-transform group-hover:scale-105" alt="Icon Logo" />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                <p className="text-xs text-prim">Expand Sidebar</p>
                            </TooltipContent>
                        </Tooltip>
                    )}
                </div>

                {/* Navigation Menu */}
                <nav className="flex-1 px-0 py-4 space-y-0 overflow-y-auto">
                    {navItems.map((item) => {
                        const active = isActive(item.href);
                        return (
                            <div className='relative flex-1 pr-3 pl-4 w-full'>
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`
                                        relative flex items-center gap-x-3 pr-3 pl-[0.55rem] py-2 rounded-md text-xs font-medium transition-colors duration-300 group overflow-hidden
                                        ${active ? 'bg-prim/5 text-prim' : 'text-gray-400 hover:bg-gray-50/75 hover:text-gray-700'}
                                        ${collapsed ? 'justify-start' : ''}
                                    `}
                                    title={item.label}
                                >
                                    {item.icon}
                                    {!collapsed && <span>{item.label}</span>}
                                </Link>
                                <span className={`
                                        pointer-events-none
                                        absolute left-2 top-1/2 -translate-y-1/2 w-[2px] h-4 bg-prim rounded-md
                                        transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                                        origin-center
                                        ${active ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'}
                                    `}>
                                </span>
                            </div>
                        );
                    })}
                </nav>

                {/* Account */}
                <DropdownMenu>
                    <div className="pr-3 pl-4 py-3 overflow-hidden">
                        <DropdownMenuTrigger asChild>
                            <button
                                className={`
                            flex items-center w-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer
                            text-gray-300 rounded-lg hover:text-gray-600 hover:bg-gray-50 ring ring-gray-100
                            ${collapsed
                                        ? 'pl-0.5 pr-0 py-0.5 justify-start gap-x-0'
                                        : 'px-2 py-2 justify-between gap-x-3'
                                    }
                        `}
                            >
                                {/* Avatar — selalu flex-shrink-0 agar tidak menyusut */}
                                {user && (
                                    <div className={`
                                flex-shrink-0 rounded-md bg-linear-to-b from-prim/5 to-acctwo/80 flex items-center justify-center
                                transition-all duration-300
                                ${collapsed ? 'w-8 h-8 ring-1 ring-prim/20' : 'w-8 h-8 ring-1 ring-prim/20'}
                            `}>
                                        <img
                                            src={avatar}
                                            alt=""
                                            className="object-cover w-full h-full rounded-md mt-0.5"
                                        />
                                    </div>
                                )}

                                {/* Info user — fade in/out saat expand/collapse */}
                                <div className={`
                                flex flex-col items-start overflow-hidden whitespace-nowrap
                                transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                                ${collapsed
                                        ? 'w-0 opacity-0 translate-x-2 scale-95'
                                        : 'w-auto opacity-100 translate-x-0 scale-100'
                                    }
                            `}>
                                    <span className="text-[11px] text-gray-800 font-medium">{user?.name}</span>
                                    <span className="text-[9px] text-gray-400">{user?.email}</span>
                                </div>

                                <svg className={`flex-shrink-0 w-4 h-4 ml-auto transition-all duration-300 ${collapsed ? 'w-0 opacity-0' : 'w-4 opacity-100'}`} width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7 15L12 20L17 15M7 9L12 4L17 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            side={collapsed ? 'right' : 'top'}
                            className={cn(
                                "z-50",
                                collapsed ? "ml-4 mb-3 w-40" : "mb-0.5"
                            )}
                        >
                            <DropdownMenuItem>
                                {/* Logout */}
                                <button
                                    onClick={() => setLogoutOpen(true)}
                                    className="flex items-center gap-x-3 py-1 px-1.5 w-full justify-start rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer text-gray-500 hover:text-gray-700"
                                >
                                    <svg className='w-4.5 h-4.5 flex-shrink-0' width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18 8L22 12M22 12L18 16M22 12H9M15 4.20404C13.7252 3.43827 12.2452 3 10.6667 3C5.8802 3 2 7.02944 2 12C2 16.9706 5.8802 21 10.6667 21C12.2452 21 13.7252 20.5617 15 19.796" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <span className='text-xs'>Logout</span>
                                </button>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                {/* Logout */}
                                <button
                                    onClick={() => setLogoutOpen(true)}
                                    className="flex items-center gap-x-3 py-1 px-1.5 w-full justify-start rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer text-gray-500 hover:text-gray-700"
                                >
                                    <svg className='w-4.5 h-4.5 flex-shrink-0' width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18 8L22 12M22 12L18 16M22 12H9M15 4.20404C13.7252 3.43827 12.2452 3 10.6667 3C5.8802 3 2 7.02944 2 12C2 16.9706 5.8802 21 10.6667 21C12.2452 21 13.7252 20.5617 15 19.796" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <span className='text-xs'>Logout</span>
                                </button>
                            </DropdownMenuItem>
                            <DropdownMenuItem variant='destructive'>
                                {/* Logout */}
                                <button
                                    onClick={() => setLogoutOpen(true)}
                                    className="flex items-center gap-x-3 py-1 px-1.5 w-full justify-start rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer text-red-500 hover:text-red-500"
                                >
                                    <svg className='w-4.5 h-4.5 flex-shrink-0' xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M136,224V176H104V80h32V32l96,96Z" opacity="0.2"></path><path d="M237.66,122.34l-96-96A8,8,0,0,0,128,32V72H104a8,8,0,0,0-8,8v96a8,8,0,0,0,8,8h24v40a8,8,0,0,0,13.66,5.66l96-96A8,8,0,0,0,237.66,122.34ZM144,204.69V176a8,8,0,0,0-8-8H112V88h24a8,8,0,0,0,8-8V51.31L220.69,128ZM48,80v96a8,8,0,0,1-16,0V80a8,8,0,0,1,16,0Zm32,0v96a8,8,0,0,1-16,0V80a8,8,0,0,1,16,0Z"></path></svg>
                                    <span className='text-xs'>Keluar</span>
                                </button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </div>
                </DropdownMenu>

            </aside >

            {/* Dialog logout */}
            < Dialog open={logoutOpen} onOpenChange={setLogoutOpen} >
                <DialogContent className="!w-80 !max-w-80">
                    <div className="flex flex-col items-center space-y-3">
                        <div className="flex flex-col items-center justify-center py-2 space-y-3">
                            <div className="w-fit">
                                <img src={icon} alt="" className='w-20 h-20' />
                            </div>
                            <div className="flex flex-col space-y-1 w-48">
                                <p className="font-semibold text-center text-xs text-gray-800">Keluar dari panel?</p>
                                <p className="text-[10px] text-gray-400 text-center">Dengan ini sesi anda akan diakhiri dan perlu login kembali</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2 justify-center">
                        <DialogClose asChild>
                            <Button variant="outline" className="text-xs cursor-pointer flex-1">Batal</Button>
                        </DialogClose>
                        <Link
                            href="/auth/logout"
                            method="post"
                            as="button"
                            className="inline-flex flex-1 items-center justify-center text-xs px-4 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors cursor-pointer"
                        >
                            Logout
                        </Link>
                    </div>
                </DialogContent>
            </Dialog >

            {/* Workspace Area */}
            < div className="flex-1 flex flex-col overflow-hidden" >

                {/* Topbar */}
                < div className="bg-white border-b border-gray-100 h-14 px-4 flex items-center justify-between lg:px-6" >
                    <div className="flex items-center gap-4">
                        {/* Tombol menu: Hanya muncul di sm (di bawah 640px) */}
                        <button
                            className="hidden sm:block p-1.5 rounded-lg text-gray-500 hover:bg-gray-100"
                            onClick={() => setMobileOpen(true)}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>

                    {/* Avatar */}
                    {
                        user && (
                            <div className="w-8 h-8 rounded-full bg-linear-to-b from-prim/10 to-prim/20 flex items-center ring ring-prim/20 justify-center">
                                <span className="text-xs font-semibold text-prim">
                                    {user.name?.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        )
                    }
                </ div >

                {/* Page content */}
                < div className="flex-1 overflow-y-auto p-4 lg:p-6" >
                    {children}
                </div >
            </div >
        </div >
    );
}