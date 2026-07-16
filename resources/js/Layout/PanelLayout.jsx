import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import logoutIcon from '../../../public/img/logout.svg'
import avatar from '../../../public/img/avatar.png'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const navItems = [
    {
        label: 'Beranda',
        href: '/panel/dashboard',
        icon: (
            <svg className="w-4.5 h-4.5 flex-shrink-0" width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.4 3H4.6C4.03995 3 3.75992 3 3.54601 3.10899C3.35785 3.20487 3.20487 3.35785 3.10899 3.54601C3 3.75992 3 4.03995 3 4.6V8.4C3 8.96005 3 9.24008 3.10899 9.45399C3.20487 9.64215 3.35785 9.79513 3.54601 9.89101C3.75992 10 4.03995 10 4.6 10H8.4C8.96005 10 9.24008 10 9.45399 9.89101C9.64215 9.79513 9.79513 9.64215 9.89101 9.45399C10 9.24008 10 8.96005 10 8.4V4.6C10 4.03995 10 3.75992 9.89101 3.54601C9.79513 3.35785 9.64215 3.20487 9.45399 3.10899C9.24008 3 8.96005 3 8.4 3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M19.4 3H15.6C15.0399 3 14.7599 3 14.546 3.10899C14.3578 3.20487 14.2049 3.35785 14.109 3.54601C14 3.75992 14 4.03995 14 4.6V8.4C14 8.96005 14 9.24008 14.109 9.45399C14.2049 9.64215 14.3578 9.79513 14.546 9.89101C14.7599 10 15.0399 10 15.6 10H19.4C19.9601 10 20.2401 10 20.454 9.89101C20.6422 9.79513 20.7951 9.64215 20.891 9.45399C21 9.24008 21 8.96005 21 8.4V4.6C21 4.03995 21 3.75992 20.891 3.54601C20.7951 3.35785 20.6422 3.20487 20.454 3.10899C20.2401 3 19.9601 3 19.4 3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M19.4 14H15.6C15.0399 14 14.7599 14 14.546 14.109C14.3578 14.2049 14.2049 14.3578 14.109 14.546C14 14.7599 14 15.0399 14 15.6V19.4C14 19.9601 14 20.2401 14.109 20.454C14.2049 20.6422 14.3578 20.7951 14.546 20.891C14.7599 21 15.0399 21 15.6 21H19.4C19.9601 21 20.2401 21 20.454 20.891C20.6422 20.7951 20.7951 20.6422 20.891 20.454C21 20.2401 21 19.9601 21 19.4V15.6C21 15.0399 21 14.7599 20.891 14.546C20.7951 14.3578 20.6422 14.2049 20.454 14.109C20.2401 14 19.9601 14 19.4 14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M8.4 14H4.6C4.03995 14 3.75992 14 3.54601 14.109C3.35785 14.2049 3.20487 14.3578 3.10899 14.546C3 14.7599 3 15.0399 3 15.6V19.4C3 19.9601 3 20.2401 3.10899 20.454C3.20487 20.6422 3.35785 20.7951 3.54601 20.891C3.75992 21 4.03995 21 4.6 21H8.4C8.96005 21 9.24008 21 9.45399 20.891C9.64215 20.7951 9.79513 20.6422 9.89101 20.454C10 20.2401 10 19.9601 10 19.4V15.6C10 15.0399 10 14.7599 9.89101 14.546C9.79513 14.3578 9.64215 14.2049 9.45399 14.109C9.24008 14 8.96005 14 8.4 14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        ),
    },
    {
        label: 'Artikel',
        href: '/panel/artikel',
        icon: (
            <svg className="w-4.5 h-4.5 flex-shrink-0" width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 11H8M10 15H8M16 7H8M20 6.8V17.2C20 18.8802 20 19.7202 19.673 20.362C19.3854 20.9265 18.9265 21.3854 18.362 21.673C17.7202 22 16.8802 22 15.2 22H8.8C7.11984 22 6.27976 22 5.63803 21.673C5.07354 21.3854 4.6146 20.9265 4.32698 20.362C4 19.7202 4 18.8802 4 17.2V6.8C4 5.11984 4 4.27976 4.32698 3.63803C4.6146 3.07354 5.07354 2.6146 5.63803 2.32698C6.27976 2 7.11984 2 8.8 2H15.2C16.8802 2 17.7202 2 18.362 2.32698C18.9265 2.6146 19.3854 3.07354 19.673 3.63803C20 4.27976 20 5.11984 20 6.8Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        ),
    },
    {
        label: 'Masukan',
        href: '/panel/feedback',
        icon: (
            <svg className="w-4.5 h-4.5 flex-shrink-0" width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 10.5H7.51M12 10.5H12.01M16.5 10.5H16.51M9.9 19.2L11.36 21.1467C11.5771 21.4362 11.6857 21.5809 11.8188 21.6327C11.9353 21.678 12.0647 21.678 12.1812 21.6327C12.3143 21.5809 12.4229 21.4362 12.64 21.1467L14.1 19.2C14.3931 18.8091 14.5397 18.6137 14.7185 18.4645C14.9569 18.2656 15.2383 18.1248 15.5405 18.0535C15.7671 18 16.0114 18 16.5 18C17.8978 18 18.5967 18 19.1481 17.7716C19.8831 17.4672 20.4672 16.8831 20.7716 16.1481C21 15.5967 21 14.8978 21 13.5V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V13.5C3 14.8978 3 15.5967 3.22836 16.1481C3.53284 16.8831 4.11687 17.4672 4.85195 17.7716C5.40326 18 6.10218 18 7.5 18C7.98858 18 8.23287 18 8.45951 18.0535C8.76169 18.1248 9.04312 18.2656 9.2815 18.4645C9.46028 18.6137 9.60685 18.8091 9.9 19.2ZM8 10.5C8 10.7761 7.77614 11 7.5 11C7.22386 11 7 10.7761 7 10.5C7 10.2239 7.22386 10 7.5 10C7.77614 10 8 10.2239 8 10.5ZM12.5 10.5C12.5 10.7761 12.2761 11 12 11C11.7239 11 11.5 10.7761 11.5 10.5C11.5 10.2239 11.7239 10 12 10C12.2761 10 12.5 10.2239 12.5 10.5ZM17 10.5C17 10.7761 16.7761 11 16.5 11C16.2239 11 16 10.7761 16 10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
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
                                        ${active ? 'bg-prim/10 text-prim' : 'text-gray-500 hover:bg-gray-50/75 hover:text-gray-700'}
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
                                flex-shrink-0 rounded-md bg-linear-to-b from-prim/5 to-prim/20 flex items-center justify-center
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
                        <DropdownMenuContent>
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
                                    <svg className='w-4.5 h-4.5 flex-shrink-0' width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18 8L22 12M22 12L18 16M22 12H9M15 4.20404C13.7252 3.43827 12.2452 3 10.6667 3C5.8802 3 2 7.02944 2 12C2 16.9706 5.8802 21 10.6667 21C12.2452 21 13.7252 20.5617 15 19.796" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
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