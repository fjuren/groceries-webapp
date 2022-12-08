import Breadcrumb from '../../components/breadcrumb';
// import { useNavigate } from 'react-router-dom';

const Createnewrecipe = () => {
  //   const navigation = useNavigate();
  const parentPage = '/recipes';
  const parentPageName = 'Recipes';
  const currentPageName = 'Create a recipe';

  return (
    <div>
      <Breadcrumb
        parentPageName={parentPageName}
        parentPage={parentPage}
        currentPageName={currentPageName}
      />
      <h1>Create new recipe here</h1>
    </div>
  );
};

export default Createnewrecipe;
