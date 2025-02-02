import { Card, Image, Text, Button, Group } from '@mantine/core';
import '@mantine/core/styles/Card.css';
import { usePayment } from '../api/useApi';



export const ShopCard = ({ id, name, price }: { id: number, name: string, price: number }) => {

  const {mutate} = usePayment()

  function handlePayment(product_id: number, product_name: string, quantity: number, price: number) {
    mutate({
      product_id,
      product_name,
      quantity,
      amount: Math.round(price * 100),
     }, 
     {
      onSuccess: (data) => {  
        const payUrl = data?.data?.url
        localStorage.setItem("pay_session", data?.data?.id)
        window.location.href = payUrl
       },
      onError: (err) => {
        console.log(err)
      }
    }
      
   )
  }
 
    
  
    return (
      <Card key={id} className="max-h-auto max-w-[320px]" shadow="sm" padding="lg" radius="md" withBorder>
      {/* Product Image Section */}
      <Card.Section>
        <Image
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png" // Replace with actual image URL
          height={160}
          alt={name}
        />
      </Card.Section>

      {/* Product Name and Price */}
      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{name}</Text>
        <Text size="md">${price.toFixed(2)}</Text>
      </Group>

      {/* Product Description or Additional Info */}
      <Text size="sm" c="dimmed">
        Short product description goes here (optional).
      </Text>

      {/* Button to view more or purchase */}
      <Button onClick={() => handlePayment(id,
      name, 
      1, 
      price)} color="blue" fullWidth mt="md" radius="md">
        Add to Cart
      </Button>
    </Card>
      );

}

