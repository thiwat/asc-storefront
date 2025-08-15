import { LayoutProps } from "./types"

const Layout = ({
  children
}: LayoutProps) => {

  return (
    <div className={'flex flex-col w-screen h-screen'}>
      <div className={'w-full py-1 flex justify-center title-hero border-b border-b-line shadow'}>
        {'ASC'}
      </div>
      <div className={'bg-plane px-3 py-3 flex-1 overflow-y-auto no-scrollbar'}>
        {children}
      </div>
    </div>
  )
}

export default Layout