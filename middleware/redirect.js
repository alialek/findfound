export default function ({ route, redirect }) {
  const hiddenPages = ['/cabinet']
  const authRequired = hiddenPages.includes(route.path)
  const loggedIn = localStorage.getItem('user_ff')

  if (authRequired && !loggedIn) {
    redirect('/')
  }
}
