import Header from '../components/layout/Header'
import Sidebar from '../components/layout/Sidebar'
import BottomNavigation from '../components/layout/BottomNavigation'
import NewPostForm from '../components/forms/NewPostForm'
import { useMutation } from '@apollo/client/react'
import { ADD_FEED_POST } from '../../database/graphql/mutation/Feed'
import { GET_FEED, GET_FEED_BY_CATEGORY } from '../../database/graphql/queries/Feed'

function NewPost({ onNavigateToFeed }) {
  const [addFeedPost, { loading: savingPost }] = useMutation(ADD_FEED_POST, {
    refetchQueries: [{ query: GET_FEED }, { query: GET_FEED_BY_CATEGORY }],
    update: (cache, { data: { createFeed }}) => {
      try {
        const existingFeed = cache.readQuery({ query: GET_FEED })
        if (existingFeed){
          cache.writeQuery({
            query: GET_FEED,
            data: {
              feed: [createFeed, ...existingFeed.feed]
            }
          })
        }
      }
      catch (error) {
        console.log("Erro na atualização do cache", error)
      }

      try {
        const existingCategoryFeed = cache.readQuery({
          query: GET_FEED_BY_CATEGORY,
          variables: { category: createFeed.category}
        });
        if (existingCategoryFeed) {
          cache.writeQuery({
            query: GET_FEED_BY_CATEGORY,
            variables: { category: createFeed.category},
            data: {
              feedByCategory: [createFeed, ...existingCategoryFeed.feedByCategory]
            }
          })
        }
      }
      catch (error) {
        console.log(error);
      }
    }
  })
  const handleSubmit = async (formData) => {
    console.log('Nova postagem:', formData)
    try {
      const formParam = {
        user: {
          id: 1,
          name: "Leonardo Miguel"
        },
        time: parseInt(formData.tempo) * 60,
        stats: {
          distance: formData.distancia + ' Km',
          calories: formData.calorias,
          heartRate: formData.bpm + ' BPM'
        },
        category: formData.tipoTreino,
        description: formData.descricao,
        timestamp: new Date().toISOString()
      };

      await addFeedPost({variables: formParam})
    }catch (error){
      console.error("Erro ao salvar treino", error)
    }
    onNavigateToFeed?.()
  }

  const handleCancel = () => {
    onNavigateToFeed?.()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex">
        {/* Desktop Sidebar */}
        <Sidebar activeItem="feed" />
        
        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6">
          <div className="max-w-4xl mx-auto">
            <NewPostForm 
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              loading={savingPost}
            />
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNavigation activeItem="feed" />
    </div>
  )
}

export default NewPost