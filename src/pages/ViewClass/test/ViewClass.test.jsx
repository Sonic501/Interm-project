import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import ViewClass from '../ViewClass';
import { initialTrainingClassData } from '../../../redux/slices/viewClass/initialState';
import viewClassReducer from '../../../redux/slices/viewClass/classSlice';


test('renders ViewClass component', () => {
  const store = configureStore({
    reducer: {
      initialTrainingClassData: viewClassReducer
    }
  });
  render(
    <Provider store={store}>
      <ViewClass />
    </Provider>
  );
});

// Test that the component displays the correct message when trainingClassData is not found:

test('displays "Training class not found" when trainingClassData is not found', () => {
  const store = configureStore({
    reducer: {
      trainingClass: viewClassReducer
    },
    preloadedState: {
      trainingClass: {
        trainingClassData: 'Class not found'
      }
    }
  });
  const { getByText } = render(
    <Provider store={store}>
      <ViewClass />
    </Provider>
  );
  expect(getByText('Training class not found')).toBeInTheDocument();
});

// Test that the component displays the loading spinner when loading is true:

test('displays loading spinner when loading is true', () => {
  const store = configureStore({
    reducer: {
      trainingClass: viewClassReducer
    },
    preloadedState: {
      trainingClass: {
        loading: true
      }
    }
  });
  const { getByTestId } = render(
    <Provider store={store}>
      <ViewClass />
    </Provider>
  );
  expect(getByTestId('loading-spinner')).toBeInTheDocument();
});

// Test that the component displays an error message when error is true:

test('displays error message when error is true', () => {
  const store = configureStore({
    reducer: {
      trainingClass: viewClassReducer
    },
    preloadedState: {
      trainingClass: {
        error: true
      }
    }
  });
  const { getByText } = render(
    <Provider store={store}>
      <ViewClass />
    </Provider>
  );
  expect(getByText('Something went wrong')).toBeInTheDocument();
});

// Test that the component renders the Name component:

test('renders Name component', () => {
  const store = configureStore({
    reducer: {
      trainingClass: viewClassReducer
    },
    preloadedState: {
      trainingClass: {
        trainingClassData: { content: [] }
      }
    }
  });
  const { getByText } = render(
    <Provider store={store}>
      <ViewClass />
    </Provider>
  );
  expect(getByText('Name')).toBeInTheDocument();
});

// Test that the component renders the SearchBar component:

test('renders SearchBar component', () => {
  const store = configureStore({
    reducer: {
      trainingClass: viewClassReducer
    },
    preloadedState: {
      trainingClass: {
        trainingClassData: { content: [] }
      }
    }
  });
  const { getByLabelText } = render(
    <Provider store={store}>
      <ViewClass />
    </Provider>
  );
  expect(getByLabelText('Search')).toBeInTheDocument();
});

// Test that the component renders the SearchList component:

test('renders SearchList component', () => {
  const store = configureStore({
    reducer: {
      trainingClass: viewClassReducer
    },
    preloadedState: {
      trainingClass: {
        trainingClassData: { content: [] }
      }
    }
  });
  const { getByText } = render(
    <Provider store={store}>
      <ViewClass />
    </Provider>
  );
  expect(getByText('Search List')).toBeInTheDocument();
});