import { ProductManagement } from './../../components/ProductManagement'

export const Inspector = () => {
  return (
    <div>
      <header className='h-[250px] w-full rounded-2xl my-3 bg-[url("/inspector-bg.svg")] bg-right bg-no-repeat bg-cover flex flex-col justify-center pl-20'>
        <h1 className='font-bold text-3xl mt-8'>
          Principle of Correct Inspection
        </h1>
        <div className='font-medium leading-normal'>
          Step 1:Select product and click "Inspecting" to package all data
          without further updates.
          <br />
          Step 2: Review product information and manufacturing history.
          <br />
          Step 3: Assess quality, upload certificate, and submit by clicking
          "Inspect".
        </div>
      </header>

      <main>
        <ProductManagement />
      </main>
    </div>
  )
}
