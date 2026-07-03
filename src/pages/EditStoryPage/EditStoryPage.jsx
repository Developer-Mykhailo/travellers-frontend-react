import Section from '../../components/Section/Section';
import Container from '../../components/common/Container/Container';
import AddStoryForm from '../../features/stories/components/AddStoryForm/AddStoryForm';

import css from '../AddStoryPage/AddStoryPage.module.css';

const EditStoryPage = () => {
  return (
    <Section className={css.addStorySection}>
      <Container>
        <h1 className="title">Edit Story</h1>

        <AddStoryForm mode="edit" />
      </Container>
    </Section>
  );
};

export default EditStoryPage;
