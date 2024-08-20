import { ProductManagement } from './../../components/ProductManagement'

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
        <ProductManagement></ProductManagement>
      </main>
    </div>
  )
}
