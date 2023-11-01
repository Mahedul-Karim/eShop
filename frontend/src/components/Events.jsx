import Container from '../util/Container';
import EventCard from "./layout/EventCard";
import Heading from '../components/ui/Heading';


function Events() {
  return (
   <Container styles={'my-4'}>
      <Heading>Deals and outlets</Heading>
      <EventCard />
   </Container>
  );
}
export default Events;