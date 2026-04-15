import Container from '../../components/common/Container/Container';
import Section from '../../components/Section/Section';
import AddStoryForm from '../../features/stories/components/AddStoryForm/AddStoryForm';

import css from './AddStoryPage.module.css';

const AddStoryPage = () => {
  return (
    <>
      <Section className={css.addStorySection}>
        <Container>
          <h1 className="title">Create New Story</h1>

          <AddStoryForm />
        </Container>
      </Section>
    </>
  );
};

export default AddStoryPage;
