<template>
	<div class="main-body">
		<div class="visual">
			<div class="visual-body">
				<img src="/assets/images/common/img_card07.jpg" alt="">
			</div>
		</div>
		<article class="article">
			<section class="section topics-section">
				<div class="section-body">
					<div class="topic-header style--column">
						<h1 class="topics-title section-title style--font-en style--font-bold">{{ msg }}</h1>
						<div class="topics-data">
							<p class="topics-day style--font-en style--font-thin">2018.11.21</p>
							<p class="topics-author style--font-en style--font-thin">author author</p>
						</div>
					</div>
					<p class="topics-text">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit.<br>
						Incidunt quo reiciendis nostrum cumque omnis.<br>
						Ullam blanditiis doloribus autem fugit necessitatibus,<br>
						officia provident molestias,<br>
						earum reiciendis dolor maxime dolore quam tenetur.
					</p>
				</div>
			</section>
			<section class="section pagenation-section">
				<div class="pagenation-body style--column style--font-en style--font-black">
					<div class="pagenation-prev"><router-link to="/topics06"><</router-link></div>
					<div class="pagenation-next"><router-link to="/topics01">></router-link></div>
				</div>
			</section>
		</article>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				msg: 'Topics 07'
			}
		}
	}
</script>
