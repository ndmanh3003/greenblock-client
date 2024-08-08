import { ButtonC, Line, ProductCard } from '../../components'

export const Inspector = () => {
  return (
    <div>
      <header className='h-[250px] w-full rounded-2xl my-3 bg-[url("inspector-bg.svg")] bg-right bg-no-repeat bg-cover flex flex-col justify-center pl-20'>
        <h1 className='font-bold text-3xl mt-8'>
          Principle of Correct Inspection
        </h1>
        <div className='font-medium leading-normal'>
          Step 1: Visually inspect for contamination or spoilage.
          <br />
          Step 2: Conduct laboratory tests for pathogens and quality standards.
          <br />
          Step 3: Verify results against regulatory standards and document
          findings.
        </div>
      </header>

      <main>
        <h1 className='font-bold text-3xl mt-8'>
          Wait-list to Inspection
          <Line theme='light' />
        </h1>
        <div className='grid-cols-3 grid gap-4 '>
          <ProductCard key={1} />
          <ProductCard key={2} />
          <ProductCard key={3} />
          <ProductCard key={4} />
        </div>
      </main>
      <div className='mt-10 w-full flex justify-center relative'>
        <div className='w-full h-full absolute top-1/2 border-t-[1px] border-dashed -z-20' />
        <ButtonC
          variant='primary'
          className='!text-base !bg-white !text-green3 !border-[1px] !border-gray-200 hover:!bg-linear1 transition-all delay-75 ease-in-out relative !px-8'
        >
          Show more
          <div className='absolute w-14 h-full bg-white top-0 right-0 -z-10 translate-x-1/2'>
            <div className='bg-gray-200 h-2 w-2 absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-[1px] -z-20 rotate-45' />
            <div className='bg-white h-3 w-2 absolute right-[5px] top-1/2 -translate-y-1/2 -translate-x-1/2 -z-20' />
          </div>
          <div className='absolute w-14 h-full bg-white top-0 left-0 -z-10 -translate-x-1/2'>
            <div className='bg-gray-200 h-2 w-2 absolute left-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-[1px] -z-20 rotate-45' />
            <div className='bg-white h-3 w-2 absolute left-[5px] top-1/2 -translate-y-1/2 translate-x-1/2 -z-20' />
          </div>
        </ButtonC>
      </div>
    </div>
  )
}
