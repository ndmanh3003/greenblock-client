import { Line } from '../../components'

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
          List of Products
          <Line theme='light' />
        </h1>
        <div className='grid-cols-3 grid gap-4 '></div>
      </main>
    </div>
  )
}
