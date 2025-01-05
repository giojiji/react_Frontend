import { MantineProvider, Pagination } from '@mantine/core';



export default function Profile() {
    return (
      <div >
        <MantineProvider >
      <Pagination total={10} />
      </MantineProvider>
      </div>
    );
  }