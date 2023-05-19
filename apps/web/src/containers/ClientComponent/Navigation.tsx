'use client'

import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { Fragment, useEffect, useRef, useState } from 'react'
import { useProducts } from './contexts/ProductsContext'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export interface NavigationProps {
  categories: Array<string>
}

export default function Navigation(props: NavigationProps) {
  const { categories } = props

  const [open, setOpen] = useState(false)
  const [isSearchOpen, setSearchOpen] = useState(false)
  const searchContainerRef = useRef<HTMLDivElement>(null)
  const { dispatch, state } = useProducts()

  const handleClickOutside = (event) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(event.target)
    ) {
      setSearchOpen(false)
    }
  }

  const handleOpen = (close?: boolean) => {
    setOpen((prev) => (close ? false : !prev))
  }

  const handleAlgoliaSearch = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const algoliaAppId = String(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID)
    const algoliaApiKey = String(process.env.NEXT_PUBLIC_ALGOLIA_API_KEY)
    const algoliaIndexName = String(process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME)
    const algoliaUrl = `https://${algoliaAppId}-dsn.algolia.net/1/indexes/${algoliaIndexName}`
    const algoliaResponse = await fetch(
      `${algoliaUrl}?query=${event.target.value}`,
      {
        method: 'GET',
        headers: {
          'X-Algolia-API-Key': algoliaApiKey,
          'X-Algolia-Application-Id': algoliaAppId,
          'Content-Type': 'application/json',
        },
      },
    )
    if (!algoliaResponse.ok)
      throw Error('Could not fetch algolia search results ' + algoliaResponse)

    const json = await algoliaResponse.json()
    dispatch({ type: 'populate', payload: json })
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <header className="relative bg-white">
      {/* Will only be showed in mobile view */}
      <MobileMenu isOpen={open} onOpen={handleOpen} categories={categories} />

      <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200">
          <div className="flex h-16 items-center">
            <button
              type="button"
              className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
              onClick={() => setOpen(true)}
            >
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {isSearchOpen ? null : (
              <>
                <div className="ml-4 flex lg:ml-0">
                  <Link href="/">
                    <span className="text-2xl font-bold">🚀 Turbo</span>
                  </Link>
                </div>
                <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                  <div className="flex h-full space-x-8">
                    {categories.map((category) => (
                      <Popover key={category} className="flex">
                        {({ open }) => (
                          <>
                            <div className="relative flex">
                              <Popover.Button
                                className={classNames(
                                  open
                                    ? 'border-indigo-600 text-indigo-600'
                                    : 'border-transparent text-gray-700 hover:text-gray-800',
                                  'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out outline-none',
                                )}
                              >
                                {category}
                              </Popover.Button>
                            </div>
                          </>
                        )}
                      </Popover>
                    ))}
                  </div>
                </Popover.Group>
              </>
            )}

            <div
              ref={searchContainerRef}
              className={`${
                isSearchOpen ? 'md:ml-auto w-full' : 'ml-auto'
              } flex items-center relative`}
            >
              <input
                type="text"
                placeholder="Search..."
                onChange={handleAlgoliaSearch}
                className={`${
                  isSearchOpen ? 'block' : 'hidden'
                } top-0 left-0 z-10 w-full transition-all duration-500 ease-in-out transform scale-100 absolute 
                               h-full px-4 bg-white rounded-md text-sm text-gray-900 shadow-sm outline-none
                               focus:ring-2 focus:ring-blue-600 `}
                onBlur={() => setSearchOpen(false)}
              />
              <div className="relative flex lg:ml-6 cursor-pointer">
                <div
                  className="p-2 text-gray-400 hover:text-gray-500 cursor-pointer"
                  onClick={() => setSearchOpen(!isSearchOpen)}
                >
                  <span className="sr-only">Search</span>
                  <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                </div>
              </div>
              <div className="ml-4 flow-root lg:ml-6">
                <a href="#" className="group -m-2 flex items-center p-2">
                  <ShoppingBagIcon
                    className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                    0
                  </span>
                  <span className="sr-only">items in cart, view bag</span>
                </a>
              </div>
              <div className="hidden lg:ml-8 lg:flex lg:mr-8">
                <a
                  href="#"
                  className="flex items-center text-gray-700 hover:text-gray-800"
                >
                  <img
                    src="https://tailwindui.com/img/flags/flag-canada.svg"
                    alt=""
                    className="block h-auto w-5 flex-shrink-0"
                  />
                  <span className="ml-3 block text-sm font-medium">CAD</span>
                  <span className="sr-only">, change currency</span>
                </a>
              </div>
              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                <a
                  href="#"
                  className="text-sm font-medium text-gray-700 hover:text-gray-800"
                >
                  Sign in
                </a>
                <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                <a
                  href="#"
                  className="text-sm font-medium text-gray-700 hover:text-gray-800"
                >
                  Create account
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

interface MobileMenuProps {
  onOpen: (close?: boolean) => void
  isOpen: boolean
  categories: Array<string>
}
const MobileMenu = (props: MobileMenuProps) => {
  const { isOpen, onOpen, categories } = props

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-40 lg:hidden" onClose={onOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
              <div className="flex px-4 pb-2 pt-5">
                <button
                  type="button"
                  className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                  onClick={() => onOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Links */}
              <Tab.Group as="div" className="mt-2">
                <div className="border-b border-gray-200">
                  <Tab.List className="-mb-px flex space-x-8 px-4 overflow-x-auto">
                    {categories.map((category) => (
                      <Tab
                        key={category}
                        className={({ selected }) =>
                          classNames(
                            selected
                              ? 'border-indigo-600 text-indigo-600'
                              : 'border-transparent text-gray-900',
                            'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium',
                          )
                        }
                      >
                        {category}
                      </Tab>
                    ))}
                  </Tab.List>
                </div>
              </Tab.Group>

              {/* <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a
                        href={page.href}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div> */}

              <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                <div className="flow-root">
                  <a
                    href="#"
                    className="-m-2 block p-2 font-medium text-gray-900"
                  >
                    Sign in
                  </a>
                </div>
                <div className="flow-root">
                  <a
                    href="#"
                    className="-m-2 block p-2 font-medium text-gray-900"
                  >
                    Create account
                  </a>
                </div>
              </div>

              <div className="border-t border-gray-200 px-4 py-6">
                <a href="#" className="-m-2 flex items-center p-2">
                  <img
                    src="https://tailwindui.com/img/flags/flag-canada.svg"
                    alt=""
                    className="block h-auto w-5 flex-shrink-0"
                  />
                  <span className="ml-3 block text-base font-medium text-gray-900">
                    CAD
                  </span>
                  <span className="sr-only">, change currency</span>
                </a>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
