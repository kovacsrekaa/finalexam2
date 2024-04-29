<script setup lang="ts">
import { getMoviebyGenre, getMoviebyId } from "./fetch"
import { Movie } from "./model"
import { ref, computed } from "vue"

const movies = ref<Movie[]>([])
const loading = ref(false)
const genre = ref<string | null>(null)
const id = ref<string | null>(null)
const searchPerformed = ref(false)

const handleMovies = async () => {
    loading.value = true;
    searchPerformed.value = true;

    if (genre.value !== null) {
        const response = await getMoviebyGenre(genre.value);
        if (response.success) {
            const data = response.data;
            movies.value = data
        } else {
            console.error('Failed to fetch movies:', response.status);
        }
    }

    if (id.value !== null) {
        const response = await getMoviebyId(id.value);
        if (response.success) {
            const data = response.data;
            movies.value = data;
        } else {
            console.error('Failed to fetch movie:', response.status);
        }
    }

    loading.value = false;
}

const cancel = () => {
    genre.value = null;
    id.value = null;
    movies.value = [];
    searchPerformed.value = false;
    loading.value = false;
}

const showCancelButton = computed(() => movies.value.length > 0 || searchPerformed.value === true);
</script>

<template>
    <main class="flex justify-center items-center py-16">
        <section class="card card-body max-w-[400px] bg-secondary">
            <h1 class="text-xl flex justify-center items-center mb-4"> Search by Movie genre or id: </h1>
            <input v-model="genre" className="input w-full max-w-xs" type="text" placeholder="Search by genre">
            <input v-model="id" className="input w-full max-w-xs" type="text" placeholder="Search by id">
            <button class="btn btn-primary  w-full max-w-xs" @click="handleMovies()">Search</button>
            <div v-if="showCancelButton">
                <button class="btn btn-accent w-full max-w-xs" @click="cancel()">Cancel</button>
            </div>
            <div class="justify-center items-center" v-if="loading === true">
                <div class="loading loading-spinner text-neutral"></div>
            </div>
            <div v-if="movies.length === 0 && !loading && searchPerformed" class="text-center text-primary">
                No movies found.
            </div>
            <div class="justify-center">
                <div v-for="movie in movies">
                    <div className="card w-80 bg-base-100 shadow-xl mb-5 mt-5">
                        <figure v-if="movie.name === 'Titanic'"> <img src=".\assets\StockSnap_11FQZHQMFD.jpg"
                                alt="Titanic" /></figure>
                        <figure v-if="movie.name === 'Star Wars'"> <img src=".\assets\StockSnap_CLHZRIVBZF.jpg"
                                alt="Star Wars" /></figure>
                        <figure v-if="movie.name === 'Lord of the rings'"> <img src=".\assets\StockSnap_6B3VYEQOGI.jpg"
                                alt="Lord of the rings" /></figure>
                        <figure v-if="movie.name === 'Pulp fiction'"> <img src=".\assets\StockSnap_DLOPQTT3DN.jpg"
                                alt="Pulp fiction" /></figure>
                        <figure v-if="movie.name === 'Avatar'"> <img src=".\assets\StockSnap_EQJTV9C5ZO.jpg"
                                alt="Avatar" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">
                                {{ movie.name }}
                                <div className="badge badge-secondary">popular</div>
                            </h2>
                            <div v-if="movie.name === 'Titanic'" className="card-actions justify-end">
                                <div className="badge badge-outline">{{ movie.genre }}</div>
                            </div>
                            <div v-if="movie.name === 'Star Wars'" className="card-actions justify-end">
                                <div className="badge badge-outline">{{ movie.genre }}</div>

                            </div>
                            <div v-if="movie.name === 'Lord of the rings'" className="card-actions justify-end">
                                <div className="badge badge-outline">{{ movie.genre }}</div>

                            </div>
                            <div v-if="movie.name === 'Avatar'" className="card-actions justify-end">
                                <div className="badge badge-outline">{{ movie.genre }}</div>

                            </div>
                            <div v-if="movie.name === 'Pulp fiction'" className="card-actions justify-end">
                                <div className="badge badge-outline">{{ movie.genre }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>
