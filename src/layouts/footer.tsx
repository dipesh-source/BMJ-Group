

export default function Footer() {

  return (
    <footer className="bg-white rounded-lg dark:bg-gray-900 m-4">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                <img src="https://www.booker.co.uk/images/ShopLocallyLogo.jpg" className="h-10" alt="Shop Locally" />
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Terms & Conditions</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Privacy & Cookies</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Legal</a>
                </li>
                <li>
                    <a href="#" className="hover:underline  md:me-6">Investor Relations</a>
                </li>
                <li>
                    <a href="#" className="hover:underline  md:me-6">Contact Us</a>
                </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023 <a href="https://flowbite.com/" className="hover:underline">Flowbite™</a>
            . All Rights Reserved.
          </span>
        </div>
    </footer>
  )
}
