import React from 'react'

export default function EventDetail() {
  return (
    <div className="w-full min-h-screen">
      <div className="w-full">
        <div className="img">
          <img
            src="https://imageio.forbes.com/specials-images/imageserve/61290485e59b1a3c399d34e7/0x0.jpg?format=jpg&crop=2699,1519,x0,y0,safe&height=900&width=1600&fit=bounds"
            className="object-fill object-top w-full h-[550px]"
            alt="Event Image"
          />
        </div>

        <div className="eventInfo space-y-2 mt-4 mx-[450px] mb-20 text-center">
          <h1 className='text-5xl font-bold text-white'>Tennis Game</h1>
          <h3 className='text-2xl font-bold text-white'>Level: </h3>
          <h4 className="flex items-center gap-2 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 512 512">
              <path fill="white" d="M271.514 95.5h-32v178.111l115.613 54.948l13.737-28.902l-97.35-46.268z" />
              <path fill="white" d="M256 16C123.452 16 16 123.452 16 256s107.452 240 240 240s240-107.452 240-240S388.548 16 256 16m0 448c-114.875 0-208-93.125-208-208S141.125 48 256 48s208 93.125 208 208s-93.125 208-208 208" />
            </svg>
            Time
          </h4>

          <h4 className="flex items-center gap-2 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
              <path fill="white" d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7" />
            </svg>
            Location
          </h4>

          <h4 className="flex items-center gap-2 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
              <path fill="white" d="M3.5 8a5.5 5.5 0 1 1 8.596 4.547a9.005 9.005 0 0 1 5.9 8.18a.751.751 0 0 1-1.5.045a7.5 7.5 0 0 0-14.993 0a.75.75 0 0 1-1.499-.044a9.005 9.005 0 0 1 5.9-8.181A5.5 5.5 0 0 1 3.5 8M9 4a4 4 0 1 0 0 8a4 4 0 0 0 0-8m8.29 4q-.221 0-.434.03a.75.75 0 1 1-.212-1.484a4.53 4.53 0 0 1 3.38 8.097a6.69 6.69 0 0 1 3.956 6.107a.75.75 0 0 1-1.5 0a5.19 5.19 0 0 0-3.696-4.972l-.534-.16v-1.676l.41-.209A3.03 3.03 0 0 0 17.29 8" />
            </svg>
            Players
          </h4>

        </div>
        <div className="flex justify-center mb-[150px]">
          <section className="bg-white w-1/2 rounded-lg py-8 lg:py-16 antialiased">
            <div className="max-w-2xl mx-auto px-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-4xl font-bold">Team Discussion</h2>
              </div>
              <form className="mb-6">
                <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 flex items-center">
                  <label htmlFor="comment" className="sr-only">Your comment</label>
                  <textarea
                    id="comment"
                    className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
                    placeholder="Write a comment..."
                    required
                  ></textarea>
                  <button
                    type="submit"
                    className="ml-2 text-gray-500 hover:text-gray-900 focus:outline-none"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 56 56">
                      <path fill="currentColor" d="M32.781 52.55c1.688 0 2.883-1.452 3.75-3.702L51.883 8.746c.422-1.078.68-2.039.68-2.836c0-1.523-.961-2.46-2.485-2.46c-.797 0-1.758.234-2.836.656L6.93 19.55c-1.97.75-3.493 1.945-3.493 3.656c0 2.156 1.641 2.883 3.891 3.563l16.922 4.968l4.922 16.711c.703 2.367 1.43 4.102 3.61 4.102m-7.476-24.374L9.133 23.23c-.375-.118-.492-.212-.492-.376s.093-.28.445-.421l31.687-12c1.875-.703 3.68-1.641 5.414-2.438c-1.546 1.266-3.468 2.766-4.757 4.055Zm7.851 19.219c-.187 0-.281-.165-.398-.54l-4.946-16.171l16.125-16.125c1.266-1.266 2.836-3.235 4.079-4.828c-.797 1.78-1.735 3.585-2.461 5.484l-12 31.687c-.141.352-.235.492-.399.492" />
                    </svg>
                  </button>
                </div>
              </form>

              <article className="p-6 text-base bg-white rounded-lg">
                <footer className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 font-semibold"><img
                      className="mr-2 w-6 h-6 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                      alt="Michael Gough" />Michael Gough</p>
                  </div>
                  <button id="dropdownComment1Button" data-dropdown-toggle="dropdownComment1"
                    className="inline-flex items-center p-2 text-sm font-medium text-center bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50"
                    type="button">
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                      <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                    </svg>
                    <span className="sr-only">Comment settings</span>
                  </button>
                  <div id="dropdownComment1"
                    className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow">
                    <ul className="py-1 text-sm text-gray-700"
                      aria-labelledby="dropdownMenuIconHorizontalButton">
                      <li>
                        <a href="#"
                          className="block py-2 px-4 hover:bg-gray-100">Edit</a>
                      </li>
                      <li>
                        <a href="#"
                          className="block py-2 px-4 hover:bg-gray-100">Remove</a>
                      </li>
                      <li>
                        <a href="#"
                          className="block py-2 px-4 hover:bg-gray-100">Report</a>
                      </li>
                    </ul>
                  </div>
                </footer>
                <p className="text-gray-500">Lorem ipsum odor amet, consectetuer adipiscing elit. Pulvinar pulvinar suscipit tempor nisl dictumst efficitur fermentum pellentesque. Ut elementum mollis etiam; faucibus porttitor hendrerit.</p>
                <div className="flex items-center mt-4 space-x-4">
                  <button type="button"
                    className="flex items-center text-sm text-gray-500 hover:underline font-medium">
                    <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                    </svg>
                    Reply
                  </button>
                </div>
              </article>
              <article className="p-6 mb-3 ml-6 lg:ml-12 text-base bg-white rounded-lg">
                <footer className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 font-semibold"><img
                      className="mr-2 w-6 h-6 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      alt="Jese Leos" />Jese Leos</p>
                  </div>
                  <button id="dropdownComment2Button" data-dropdown-toggle="dropdownComment2"
                    className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50"
                    type="button">
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                      <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                    </svg>
                    <span className="sr-only">Comment settings</span>
                  </button>
                  <div id="dropdownComment2"
                    className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow">
                    <ul className="py-1 text-sm text-gray-700"
                      aria-labelledby="dropdownMenuIconHorizontalButton">
                      <li>
                        <a href="#"
                          className="block py-2 px-4 hover:bg-gray-100">Edit</a>
                      </li>
                      <li>
                        <a href="#"
                          className="block py-2 px-4 hover:bg-gray-100">Remove</a>
                      </li>
                      <li>
                        <a href="#"
                          className="block py-2 px-4 hover:bg-gray-100">Report</a>
                      </li>
                    </ul>
                  </div>
                </footer>
                <p className="text-gray-500">Lorem ipsum odor amet, consectetuer adipiscing elit. Pulvinar pulvinar suscipit tempor nisl dictumst efficitur fermentum pellentesque. Ut elementum mollis etiam; faucibus porttitor hendrerit.</p>
              </article>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}