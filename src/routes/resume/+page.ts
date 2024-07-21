import { redirect } from '@sveltejs/kit'

export async function load() {
  redirect(307, 'https://drive.google.com/file/d/1p6Jcg1tic0ko-h1QEgvMb9cUSpnDXeim')
}
