import React from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment';
import { useSelector } from 'react-redux';

export default function NewsPage({news}) {
  

  const {id} = useParams();
  const data = useSelector(state=>state.data);
  const article = data.articles.find((article)=>article.article_id === id);
  console.log(article)
  const dateTimeAgo = moment(new Date(article.pubDate)).fromNow();

  return <div className="w-full p-10 text-center">

      {
        article ? 
        <>
            <h1 className="text-2xl font-extrabold">{article.title}</h1>
            
            <div className="flex items-center text-lg">
              <img src="/author.png" alt="" className="w-16 h-16 p-2" />
              <div className="flex flex-col items-start">
                <span>{dateTimeAgo}</span>
                <span>by <span className="font-bold">{(article.creator && article?.creator[0]) ? article?.creator[0].slice(article.creator[0].indexOf("(")+1,-1) :  "john"}</span>
                </span>
              </div>
            </div>
            {<img
              src={article?.image_url ? article.image_url : '/newsError.jpg'}
              alt='article img'
              className='rounded-md w-full object-cover cursor-pointer -mt-1 mb-5'
            />}

            <pre className="text-wrap text-lg text-justify">
              {article.description}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque quidem, suscipit maiores rerum tempora nesciunt eligendi, qui temporibus in, nobis similique dolores doloremque deleniti alias ea. Quaerat iure cumque provident alias odit maxime veniam sunt ipsa odio quisquam eligendi voluptatum, rem adipisci. Asperiores cum numquam reiciendis vero officiis minima doloribus consequatur iste ad consequuntur fugiat necessitatibus, laborum quis saepe dolorum aspernatur velit magnam distinctio molestias blanditiis voluptate sapiente perspiciatis corrupti. Saepe omnis culpa maiores voluptates modi repellat dicta ea enim totam provident iusto distinctio in quos nulla aliquid eos, quasi nemo fuga praesentium harum impedit nihil. Quae beatae deserunt possimus modi, laudantium corporis sequi repellat vitae ipsum facilis natus debitis sit suscipit exercitationem nam deleniti nostrum animi laboriosam facere quisquam id itaque. Praesentium debitis veritatis nostrum a voluptatum excepturi exercitationem velit nisi magnam reiciendis mollitia fugit quia quis totam vel repudiandae, fugiat laboriosam incidunt! Eveniet sequi numquam amet reprehenderit obcaecati maxime commodi provident itaque quisquam quo quos ratione sapiente necessitatibus fugiat autem quod cupiditate eius, eos iure dolor. Tempore fugit sunt praesentium eum vel quam debitis atque neque cum alias voluptas nisi, repellat aspernatur omnis quas explicabo. Vero illum impedit fugiat ipsam qui fugit adipisci laudantium aspernatur amet facilis! Excepturi nisi inventore ratione pariatur earum asperiores, cupiditate exercitationem odio quo laudantium debitis non fuga, vel temporibus deleniti aperiam tempore nihil error ullam, provident quod repudiandae. Quae quaerat, ipsa illo qui corrupti id necessitatibus error. Nobis reprehenderit sequi obcaecati dolorum magni, blanditiis rerum magnam dolorem ut commodi quasi amet necessitatibus quisquam unde placeat? Mollitia perspiciatis repudiandae excepturi ratione nesciunt recusandae, itaque voluptatum deleniti magnam iure veniam voluptates quisquam distinctio eaque praesentium cumque libero fugiat dolore omnis inventore, facere voluptatem! Molestias dolore, praesentium sed esse unde illo nemo nesciunt, deserunt sapiente ducimus excepturi maxime doloribus, consectetur id corrupti optio cupiditate incidunt earum error sunt saepe nam. Quo eaque dolor asperiores illum optio corporis, animi explicabo neque placeat necessitatibus ipsa aliquam iure. Placeat doloremque iste quis neque quo, dolor enim quasi nulla repudiandae, similique aliquid dicta eos at? Incidunt repellendus repellat, facilis quibusdam corporis quam, consequuntur vitae debitis delectus ex numquam. Officia architecto excepturi laborum at libero mollitia veritatis, voluptates, deserunt optio non perferendis eius! Odio, neque minima. Omnis et consectetur itaque facilis laborum perferendis velit repudiandae, quae, eius, facere esse recusandae? Voluptatibus repellendus, voluptate natus quia sed accusantium dolores consectetur officia, fuga cupiditate distinctio voluptates repudiandae qui tenetur asperiores exercitationem est ut. Rem sapiente, facilis cumque corrupti placeat est recusandae accusantium delectus sit quae dignissimos ad, sequi velit repellat totam, dolor dolores eaque eum officiis expedita odio commodi officia numquam quas. Voluptatum eius minus nobis eos vero nostrum culpa quidem asperiores odit. Ut voluptas quidem, facere adipisci in, sunt quia fugiat sapiente provident non laboriosam excepturi incidunt labore, voluptatibus sint at porro praesentium fuga sit eveniet? Natus odit explicabo placeat ab in ducimus reprehenderit minima laboriosam sapiente minus, non ipsum quam modi eius porro eos earum fugiat consequuntur, voluptates nobis, rem velit blanditiis! Deleniti excepturi repudiandae eos at sed ipsam exercitationem fugit
              <a href={article.url} target="_blank" className="hover:text-[aqua]">....</a>
            </pre>
        </> : 
        <h1 className="text-2xl font-extrabold">oops! article not found!</h1>
      }
      
    
    </div>
  
}
